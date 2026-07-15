import { useState } from 'react'
import { RefreshCw, Quote, Github, Linkedin, Twitter, Facebook, Mail } from 'lucide-react'
import { Button } from './ui/button'
import { motion, AnimatePresence } from 'motion/react'
import { playUiSound } from '../lib/sounds'
import { Tip } from './ui/tip'

const QUOTES = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Focus is not saying yes to the thing you've got to focus on. It means saying no to the hundred other good ideas.", author: "Steve Jobs" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Concentrate all your thoughts upon the work at hand. The sun's rays do not burn until brought to a focus.", author: "Alexander Graham Bell" },
  { text: "It's not that I'm so smart, it's just that I stay with problems longer.", author: "Albert Einstein" },
  { text: "Do the hard jobs first. The easy jobs will take care of themselves.", author: "Dale Carnegie" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The secret to getting things done is to act.", author: "Dante Alighieri" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
  { text: "Take up one idea. Make that one idea your life — think of it, dream of it, live on it.", author: "Swami Vivekananda" },
]

export function MotivationWidget() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * QUOTES.length))
  const [key, setKey] = useState(0)

  const refresh = () => {
    setIdx(i => (i + 1) % QUOTES.length)
    setKey(k => k + 1)
    playUiSound('notify')
  }

  const quote = QUOTES[idx]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Quote className="h-4 w-4 text-primary" />
          <h3 className="text-foreground" style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Daily Motivation</h3>
        </div>
        <Tip label="New quote">
          <Button
            variant="ghost"
            size="icon"
            onClick={refresh}
            className="h-7 w-7 cursor-pointer text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </Tip>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="rounded-xl border border-border bg-card p-4"
        >
          <p className="text-foreground italic leading-relaxed" style={{ fontSize: '0.875rem' }}>
            "{quote.text}"
          </p>
          <p className="mt-2 text-muted-foreground" style={{ fontSize: '0.75rem' }}>
            — {quote.author}
          </p>
        </motion.div>
      </AnimatePresence>

      <AuthorCredit />
    </div>
  )
}

const SOCIALS = [
  { icon: Github,   href: 'https://github.com/Maher-Elmair',            label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/maher-elmair/',   label: 'LinkedIn' },
  { icon: Twitter,  href: 'https://x.com/Maher_Elmair',                  label: 'X' },
  { icon: Facebook, href: 'https://www.facebook.com/Maher.Elmair/',      label: 'Facebook' },
  { icon: Mail,     href: 'mailto:maher.elmair.dev@gmail.com',           label: 'Email' },
]

function AuthorCredit() {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="relative flex items-center justify-center pt-1"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
        Crafted by{' '}
        <span
          className="cursor-pointer font-semibold text-primary transition-colors hover:text-primary/80"
          onClick={() => setOpen(o => !o)}
        >
          Maher Elmair
        </span>
      </p>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full mb-2 z-20 flex items-center gap-1 rounded-full border border-border bg-card/95 px-2 py-1.5 shadow-lg backdrop-blur-md"
          >
            {SOCIALS.map(({ icon: Icon, href, label }, i) => (
              <Tip key={label} label={label}>
                <motion.a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.035 }}
                  whileHover={{ scale: 1.15, color: 'var(--color-primary)' }}
                  whileTap={{ scale: 0.92 }}
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  <Icon className="h-3.5 w-3.5" />
                </motion.a>
              </Tip>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
