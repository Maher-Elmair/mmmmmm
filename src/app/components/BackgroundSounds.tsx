import { useRef, useEffect, type ComponentType } from "react";
import {
  Volume2,
  VolumeX,
  Volume1,
  CloudRain,
  Trees,
  Coffee,
  Wind,
  Waves,
  Flame,
  Music,
  Bird,
  Train,
} from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Slider } from "./ui/slider";
import { useStore } from "../stores/useStore";
import { motion } from "motion/react";
import { playUiSound, playVolumeTick } from "../lib/sounds";

interface SoundMeta {
  id: string;
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

const SOUNDS: SoundMeta[] = [
  { id: "rain", label: "Rain", description: "Gentle rainfall", icon: CloudRain },
  { id: "forest", label: "Forest", description: "Birds & rustling leaves", icon: Trees },
  { id: "coffee", label: "Coffee Shop", description: "Warm café murmur", icon: Coffee },
  { id: "noise", label: "White Noise", description: "Broadband focus masking", icon: Wind },
  { id: "ocean", label: "Ocean Waves", description: "Rolling waves, deeply calm", icon: Waves },
  { id: "fire", label: "Fireplace", description: "Crackling warmth", icon: Flame },
  { id: "birds", label: "Birdsong", description: "Morning chirps", icon: Bird },
  { id: "pink", label: "Pink Noise", description: "Balanced deep masking", icon: Music },
  { id: "train", label: "Train Ride", description: "Rhythmic carriage hum", icon: Train },
  { id: "brown", label: "Brown Noise", description: "Deep low-frequency rumble", icon: Wind },
];

// ---------- Noise buffer generators ----------
function whiteBuffer(ctx: AudioContext, seconds = 4): AudioBuffer {
  const len = ctx.sampleRate * seconds;
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  }
  return buf;
}

function pinkBuffer(ctx: AudioContext, seconds = 4): AudioBuffer {
  const len = ctx.sampleRate * seconds;
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.96900 * b2 + w * 0.1538520;
      b3 = 0.86650 * b3 + w * 0.3104856;
      b4 = 0.55000 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.0168980;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
      b6 = w * 0.115926;
    }
  }
  return buf;
}

function brownBuffer(ctx: AudioContext, seconds = 4): AudioBuffer {
  const len = ctx.sampleRate * seconds;
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.02 * w) / 1.02;
      d[i] = last * 3.5;
    }
  }
  return buf;
}

// ---------- Sound instance ----------
interface SoundInstance {
  master: GainNode;
  baseGain: number;
  cleanup: () => void;
  scheduled: number[]; // timeout ids
}

function makeNoiseSource(ctx: AudioContext, buf: AudioBuffer) {
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  src.start();
  return src;
}

// Short event tone — droplet, chirp, clink, crackle, etc.
function playEvent(
  ctx: AudioContext,
  dest: AudioNode,
  opts: {
    freq: number;
    freqEnd?: number;
    duration: number;
    type?: OscillatorType;
    gain: number;
    attack?: number;
  },
) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = opts.type ?? "sine";
  osc.frequency.setValueAtTime(opts.freq, t);
  if (opts.freqEnd !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, opts.freqEnd), t + opts.duration);
  }
  const atk = opts.attack ?? 0.005;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(opts.gain, t + atk);
  g.gain.exponentialRampToValueAtTime(0.0001, t + opts.duration);
  osc.connect(g);
  g.connect(dest);
  osc.start(t);
  osc.stop(t + opts.duration + 0.02);
}

function playNoisePop(
  ctx: AudioContext,
  dest: AudioNode,
  buf: AudioBuffer,
  duration: number,
  gainVal: number,
  freq: number,
) {
  const t = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const f = ctx.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.value = freq;
  f.Q.value = 4;
  const g = ctx.createGain();
  g.gain.setValueAtTime(gainVal, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  src.connect(f);
  f.connect(g);
  g.connect(dest);
  src.start(t);
  src.stop(t + duration + 0.02);
}

type Factory = (ctx: AudioContext, white: AudioBuffer, pink: AudioBuffer, brown: AudioBuffer) => SoundInstance;

const FACTORIES: Record<string, Factory> = {
  // Rain: filtered pink noise with subtle high-frequency shimmer + occasional droplets
  rain: (ctx, white, pink) => {
    const master = ctx.createGain();
    const baseGain = 0.55;
    master.gain.value = baseGain;
    master.connect(ctx.destination);

    const src = makeNoiseSource(ctx, pink);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1800;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 200;
    src.connect(hp);
    hp.connect(lp);
    lp.connect(master);

    // Subtle high shimmer for "raindrop" texture
    const src2 = makeNoiseSource(ctx, white);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 4500;
    bp.Q.value = 0.7;
    const g2 = ctx.createGain();
    g2.gain.value = 0.18;
    src2.connect(bp);
    bp.connect(g2);
    g2.connect(master);

    const scheduled: number[] = [];
    const dropletDest = master;
    const scheduleDroplet = () => {
      const next = 200 + Math.random() * 600;
      const id = window.setTimeout(() => {
        playEvent(ctx, dropletDest, {
          freq: 1800 + Math.random() * 1400,
          freqEnd: 800,
          duration: 0.06 + Math.random() * 0.05,
          gain: 0.04 + Math.random() * 0.05,
          type: "sine",
        });
        scheduleDroplet();
      }, next);
      scheduled.push(id);
    };
    scheduleDroplet();

    return {
      master,
      baseGain,
      scheduled,
      cleanup: () => {
        try { src.stop(); } catch {}
        try { src2.stop(); } catch {}
      },
    };
  },

  // Forest: soft wind through trees + intermittent chirps
  forest: (ctx, _w, pink) => {
    const master = ctx.createGain();
    const baseGain = 0.45;
    master.gain.value = baseGain;
    master.connect(ctx.destination);

    const src = makeNoiseSource(ctx, pink);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 900;
    const g = ctx.createGain();
    g.gain.value = 0.6;
    // slow LFO for rustle swell
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.15;
    lfoGain.gain.value = 0.25;
    lfo.connect(lfoGain);
    lfoGain.connect(g.gain);
    lfo.start();
    src.connect(lp);
    lp.connect(g);
    g.connect(master);

    const scheduled: number[] = [];
    const scheduleChirp = () => {
      const next = 1500 + Math.random() * 4000;
      const id = window.setTimeout(() => {
        const base = 2400 + Math.random() * 1800;
        const count = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < count; i++) {
          window.setTimeout(() => {
            playEvent(ctx, master, {
              freq: base,
              freqEnd: base * 1.4,
              duration: 0.09,
              gain: 0.06,
              type: "sine",
            });
          }, i * 110);
        }
        scheduleChirp();
      }, next);
      scheduled.push(id);
    };
    scheduleChirp();

    return {
      master, baseGain, scheduled,
      cleanup: () => { try { src.stop(); } catch {} try { lfo.stop(); } catch {} },
    };
  },

  // Coffee shop: low murmur + occasional cup clinks
  coffee: (ctx, white, _p, brown) => {
    const master = ctx.createGain();
    const baseGain = 0.5;
    master.gain.value = baseGain;
    master.connect(ctx.destination);

    const src = makeNoiseSource(ctx, brown);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 450;
    bp.Q.value = 0.6;
    const g = ctx.createGain();
    g.gain.value = 0.9;
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.3;
    lfoGain.gain.value = 0.2;
    lfo.connect(lfoGain);
    lfoGain.connect(g.gain);
    lfo.start();
    src.connect(bp);
    bp.connect(g);
    g.connect(master);

    const scheduled: number[] = [];
    const scheduleClink = () => {
      const next = 3000 + Math.random() * 6000;
      const id = window.setTimeout(() => {
        playNoisePop(ctx, master, white, 0.18, 0.06, 3500 + Math.random() * 1500);
        scheduleClink();
      }, next);
      scheduled.push(id);
    };
    scheduleClink();

    return {
      master, baseGain, scheduled,
      cleanup: () => { try { src.stop(); } catch {} try { lfo.stop(); } catch {} },
    };
  },

  // White noise
  noise: (ctx, white) => {
    const master = ctx.createGain();
    const baseGain = 0.35;
    master.gain.value = baseGain;
    master.connect(ctx.destination);
    const src = makeNoiseSource(ctx, white);
    src.connect(master);
    return {
      master, baseGain, scheduled: [],
      cleanup: () => { try { src.stop(); } catch {} },
    };
  },

  // Ocean: deep noise with slow swell LFO and lowpass
  ocean: (ctx, _w, pink) => {
    const master = ctx.createGain();
    const baseGain = 0.6;
    master.gain.value = baseGain;
    master.connect(ctx.destination);

    const src = makeNoiseSource(ctx, pink);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 500;
    const g = ctx.createGain();
    g.gain.value = 0.55;
    // wave swell ~0.1 Hz
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.1;
    lfoGain.gain.value = 0.4;
    lfo.connect(lfoGain);
    lfoGain.connect(g.gain);
    lfo.start();
    src.connect(lp);
    lp.connect(g);
    g.connect(master);

    return {
      master, baseGain, scheduled: [],
      cleanup: () => { try { src.stop(); } catch {} try { lfo.stop(); } catch {} },
    };
  },

  // Fireplace: brown noise hum + random crackle pops
  fire: (ctx, white, _p, brown) => {
    const master = ctx.createGain();
    const baseGain = 0.55;
    master.gain.value = baseGain;
    master.connect(ctx.destination);

    const src = makeNoiseSource(ctx, brown);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 350;
    const g = ctx.createGain();
    g.gain.value = 0.7;
    src.connect(lp);
    lp.connect(g);
    g.connect(master);

    const scheduled: number[] = [];
    const scheduleCrackle = () => {
      const next = 80 + Math.random() * 500;
      const id = window.setTimeout(() => {
        const pops = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < pops; i++) {
          window.setTimeout(() => {
            playNoisePop(
              ctx, master, white,
              0.04 + Math.random() * 0.06,
              0.08 + Math.random() * 0.12,
              1200 + Math.random() * 2400,
            );
          }, i * 30);
        }
        scheduleCrackle();
      }, next);
      scheduled.push(id);
    };
    scheduleCrackle();

    return {
      master, baseGain, scheduled,
      cleanup: () => { try { src.stop(); } catch {} },
    };
  },

  // Birdsong: faint air + frequent melodic chirps
  birds: (ctx, _w, pink) => {
    const master = ctx.createGain();
    const baseGain = 0.5;
    master.gain.value = baseGain;
    master.connect(ctx.destination);

    // very faint background air
    const src = makeNoiseSource(ctx, pink);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 600;
    const g = ctx.createGain();
    g.gain.value = 0.08;
    src.connect(lp);
    lp.connect(g);
    g.connect(master);

    const scheduled: number[] = [];
    const scheduleChirp = () => {
      const next = 400 + Math.random() * 1400;
      const id = window.setTimeout(() => {
        const base = 2200 + Math.random() * 2200;
        const count = 2 + Math.floor(Math.random() * 4);
        for (let i = 0; i < count; i++) {
          window.setTimeout(() => {
            const dir = Math.random() > 0.5 ? 1.5 : 0.7;
            playEvent(ctx, master, {
              freq: base * (0.9 + Math.random() * 0.3),
              freqEnd: base * dir,
              duration: 0.08 + Math.random() * 0.07,
              gain: 0.09,
              type: "sine",
            });
          }, i * (90 + Math.random() * 60));
        }
        scheduleChirp();
      }, next);
      scheduled.push(id);
    };
    scheduleChirp();

    return {
      master, baseGain, scheduled,
      cleanup: () => { try { src.stop(); } catch {} },
    };
  },

  // Pink noise
  pink: (ctx, _w, pink) => {
    const master = ctx.createGain();
    const baseGain = 0.4;
    master.gain.value = baseGain;
    master.connect(ctx.destination);
    const src = makeNoiseSource(ctx, pink);
    src.connect(master);
    return {
      master, baseGain, scheduled: [],
      cleanup: () => { try { src.stop(); } catch {} },
    };
  },

  // Train: rumble + rhythmic clack-clack
  train: (ctx, white, _p, brown) => {
    const master = ctx.createGain();
    const baseGain = 0.55;
    master.gain.value = baseGain;
    master.connect(ctx.destination);

    const src = makeNoiseSource(ctx, brown);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 220;
    const g = ctx.createGain();
    g.gain.value = 0.9;
    src.connect(lp);
    lp.connect(g);
    g.connect(master);

    const scheduled: number[] = [];
    let i = 0;
    const tick = () => {
      // double clack pattern
      const interval = 520;
      const id = window.setTimeout(() => {
        playNoisePop(ctx, master, white, 0.06, 0.14, 180);
        window.setTimeout(() => {
          playNoisePop(ctx, master, white, 0.06, 0.12, 220);
        }, 130);
        i++;
        tick();
      }, interval);
      scheduled.push(id);
    };
    tick();

    return {
      master, baseGain, scheduled,
      cleanup: () => { try { src.stop(); } catch {} },
    };
  },

  // Brown noise
  brown: (ctx, _w, _p, brown) => {
    const master = ctx.createGain();
    const baseGain = 0.5;
    master.gain.value = baseGain;
    master.connect(ctx.destination);
    const src = makeNoiseSource(ctx, brown);
    src.connect(master);
    return {
      master, baseGain, scheduled: [],
      cleanup: () => { try { src.stop(); } catch {} },
    };
  },
};

export function BackgroundSounds() {
  const activeSounds = useStore(s => s.activeSounds);
  const soundVolume = useStore(s => s.soundVolume);
  const toggleSound = useStore(s => s.toggleSound);
  const setSoundVolume = useStore(s => s.setSoundVolume);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const whiteRef = useRef<AudioBuffer | null>(null);
  const pinkRef = useRef<AudioBuffer | null>(null);
  const brownRef = useRef<AudioBuffer | null>(null);
  const instancesRef = useRef<Map<string, SoundInstance>>(new Map());
  const prevVolumeRef = useRef(soundVolume > 0 ? soundVolume : 0.5);

  const getCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
      whiteRef.current = whiteBuffer(audioCtxRef.current);
      pinkRef.current = pinkBuffer(audioCtxRef.current);
      brownRef.current = brownBuffer(audioCtxRef.current);
    }
    return audioCtxRef.current;
  };

  const startSound = (id: string) => {
    const ctx = getCtx();
    if (ctx.state === "suspended") ctx.resume();
    if (instancesRef.current.has(id)) return;
    const factory = FACTORIES[id];
    if (!factory) return;
    const inst = factory(ctx, whiteRef.current!, pinkRef.current!, brownRef.current!);
    inst.master.gain.value = soundVolume * inst.baseGain;
    instancesRef.current.set(id, inst);
  };

  const stopSound = (id: string) => {
    const inst = instancesRef.current.get(id);
    if (!inst) return;
    inst.scheduled.forEach((t) => clearTimeout(t));
    inst.cleanup();
    try { inst.master.disconnect(); } catch {}
    instancesRef.current.delete(id);
  };

  useEffect(() => {
    instancesRef.current.forEach((_, id) => {
      if (!activeSounds.includes(id)) stopSound(id);
    });
    activeSounds.forEach((id) => {
      if (!instancesRef.current.has(id)) startSound(id);
    });
  }, [activeSounds]);

  useEffect(() => {
    instancesRef.current.forEach((inst) => {
      inst.master.gain.value = soundVolume * inst.baseGain;
    });
  }, [soundVolume]);

  useEffect(() => {
    if (soundVolume > 0) prevVolumeRef.current = soundVolume;
  }, [soundVolume]);

  useEffect(
    () => () => {
      instancesRef.current.forEach((_, id) => stopSound(id));
      audioCtxRef.current?.close();
    },
    [],
  );

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Volume2 className="h-3.5 w-3.5 text-primary" />
          </div>
          <h3 className="text-foreground" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
            Ambient Sounds
          </h3>
        </div>
        <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>
          {activeSounds.length}/{SOUNDS.length} active
        </span>
      </div>

      {/* Show first 4 sounds (2×2 grid), rest scroll */}
      <ScrollArea className="h-[6.25rem] -mr-1 pr-1.5">
        <div className="grid grid-cols-2 gap-2">
          {SOUNDS.map((sound) => {
            const isActive = activeSounds.includes(sound.id);
            const Icon = sound.icon;
            return (
              <motion.button
                key={sound.id}
                whileTap={{ scale: 0.97 }}
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                onClick={() => toggleSound(sound.id)}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border p-2 text-left transition-all ${
                  isActive
                    ? "border-primary/35 bg-primary/6 shadow-sm"
                    : "border-border bg-card hover:bg-secondary/50"
                }`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors ${isActive ? "bg-primary/15" : "bg-secondary"}`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate leading-tight ${isActive ? "text-foreground" : "text-muted-foreground"}`}
                    style={{ fontSize: "0.8rem", fontWeight: 500 }}
                  >
                    {sound.label}
                  </p>
                  <p
                    className="truncate text-muted-foreground leading-tight"
                    style={{ fontSize: "0.65rem" }}
                  >
                    {isActive ? "▶ Playing" : sound.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </ScrollArea>

      {/* Premium volume control with visual level meter */}
      <div className="mt-auto rounded-xl border border-border bg-secondary/40 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSoundVolume(soundVolume === 0 ? prevVolumeRef.current : 0);
              playUiSound("toggle");
            }}
            className="shrink-0 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
            aria-label={soundVolume === 0 ? "Unmute" : "Mute"}
            title={soundVolume === 0 ? "Unmute" : "Mute"}
          >
            {soundVolume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : soundVolume < 0.5 ? (
              <Volume1 className="h-4 w-4 text-primary" />
            ) : (
              <Volume2 className="h-4 w-4 text-primary" />
            )}
          </button>
          <div className="flex-1 relative group">
            <Slider
              min={0}
              max={1}
              step={0.05}
              value={[soundVolume]}
              onValueChange={([v]) => {
                setSoundVolume(v);
                playVolumeTick(v);
              }}
              className="flex-1"
            />
          </div>
          <span
            className="w-9 text-right tabular-nums"
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "0.75rem",
              color: "var(--color-foreground)",
              fontWeight: 500,
            }}
          >
            {Math.round(soundVolume * 100)}%
          </span>
        </div>

        {activeSounds.length === 0 ? (
          <p className="mt-2 text-muted-foreground" style={{ fontSize: "0.7rem" }}>
            Select a sound above to start playing
          </p>
        ) : (
          <p className="mt-2 text-primary/70" style={{ fontSize: "0.7rem" }}>
            Now playing · selecting another sound will switch the playback
          </p>
        )}
      </div>
    </div>
  );
}
