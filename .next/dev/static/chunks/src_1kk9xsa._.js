(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/components/ui/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/components/ui/scroll-area.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollArea",
    ()=>ScrollArea,
    "ScrollBar",
    ()=>ScrollBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-scroll-area/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/ui/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function ScrollArea({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "scroll-area",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                "data-slot": "scroll-area-viewport",
                className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/app/components/ui/scroll-area.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollBar, {}, void 0, false, {
                fileName: "[project]/src/app/components/ui/scroll-area.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Corner"], {}, void 0, false, {
                fileName: "[project]/src/app/components/ui/scroll-area.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/ui/scroll-area.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = ScrollArea;
function ScrollBar({ className, orientation = "vertical", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaScrollbar"], {
        "data-slot": "scroll-area-scrollbar",
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex touch-none p-px transition-colors select-none", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaThumb"], {
            "data-slot": "scroll-area-thumb",
            className: "bg-border relative flex-1 rounded-full"
        }, void 0, false, {
            fileName: "[project]/src/app/components/ui/scroll-area.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/components/ui/scroll-area.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_c1 = ScrollBar;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "ScrollArea");
__turbopack_context__.k.register(_c1, "ScrollBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/components/ui/slider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Slider",
    ()=>Slider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slider/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/ui/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const Slider = /*#__PURE__*/ _s(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = _s(({ className, defaultValue, value, min = 0, max = 100, ...props }, ref)=>{
    _s();
    const _values = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "Slider.useMemo[_values]": ()=>Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [
                min,
                max
            ]
    }["Slider.useMemo[_values]"], [
        value,
        defaultValue,
        min,
        max
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        "data-slot": "slider",
        defaultValue: defaultValue,
        value: value,
        min: min,
        max: max,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Track"], {
                "data-slot": "slider-track",
                className: "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"], {
                    "data-slot": "slider-range",
                    className: "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/ui/slider.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/components/ui/slider.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            Array.from({
                length: _values.length
            }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Thumb"], {
                    "data-slot": "slider-thumb",
                    className: "border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
                }, index, false, {
                    fileName: "[project]/src/app/components/ui/slider.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/ui/slider.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}, "g0y/PG/feYg861SE8jxuAUMRVc0=")), "g0y/PG/feYg861SE8jxuAUMRVc0=");
_c1 = Slider;
Slider.displayName = "Slider";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Slider$React.forwardRef");
__turbopack_context__.k.register(_c1, "Slider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/domain/pomodoro/timer.types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_SETTINGS",
    ()=>DEFAULT_SETTINGS
]);
const DEFAULT_SETTINGS = {
    pomodoroDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    autoStartBreaks: false,
    autoStartSessions: false,
    notificationsEnabled: true,
    soundEnabled: true,
    uiSoundsEnabled: true,
    hoverSoundsEnabled: false,
    requireTaskForSession: true,
    theme: 'dark',
    dailyGoal: 8
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/domain/pomodoro/timer.rules.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "durationsFor",
    ()=>durationsFor,
    "minutesFor",
    ()=>minutesFor,
    "nextBreakMode",
    ()=>nextBreakMode
]);
function durationsFor(settings) {
    return {
        pomodoro: settings.pomodoroDuration * 60,
        shortBreak: settings.shortBreakDuration * 60,
        longBreak: settings.longBreakDuration * 60
    };
}
function nextBreakMode(nextSessionCount) {
    return nextSessionCount % 4 === 0 ? 'longBreak' : 'shortBreak';
}
function minutesFor(mode, settings) {
    if (mode === 'pomodoro') return settings.pomodoroDuration;
    if (mode === 'shortBreak') return settings.shortBreakDuration;
    return settings.longBreakDuration;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/integrations/supabase/fetch.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Shared Supabase fetch wrapper.
// Handles new-style API keys (sb_publishable_* / sb_secret_*) which are opaque
// strings, not bearer JWTs — the Authorization header is stripped for these keys
// and the key is sent via the `apikey` header only.
__turbopack_context__.s([
    "createSupabaseFetch",
    ()=>createSupabaseFetch,
    "isNewSupabaseApiKey",
    ()=>isNewSupabaseApiKey
]);
function isNewSupabaseApiKey(value) {
    return value.startsWith('sb_publishable_') || value.startsWith('sb_secret_');
}
function createSupabaseFetch(supabaseKey) {
    return (input, init)=>{
        const headers = new Headers(typeof Request !== 'undefined' && input instanceof Request ? input.headers : undefined);
        if (init?.headers) {
            new Headers(init.headers).forEach((value, key)=>headers.set(key, value));
        }
        // New Supabase API keys are opaque strings, not bearer JWTs.
        if (isNewSupabaseApiKey(supabaseKey) && headers.get('Authorization') === `Bearer ${supabaseKey}`) {
            headers.delete('Authorization');
        }
        headers.set('apikey', supabaseKey);
        return fetch(input, {
            ...init,
            headers
        });
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/integrations/supabase/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// This file is automatically generated. Do not edit it directly.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/supabase/fetch.ts [app-client] (ecmascript)");
;
;
function createSupabaseClient() {
    const SUPABASE_URL = ("TURBOPACK compile-time value", "https://qswkhyhnqnnaefozgemf.supabase.co") || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.SUPABASE_URL;
    const SUPABASE_PUBLISHABLE_KEY = ("TURBOPACK compile-time value", "sb_publishable_-x1ctaibz1RNJTxIAFyAvw_rXJPLnWW") || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.SUPABASE_PUBLISHABLE_KEY;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        global: {
            fetch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSupabaseFetch"])(SUPABASE_PUBLISHABLE_KEY)
        },
        auth: {
            storage: ("TURBOPACK compile-time truthy", 1) ? localStorage : "TURBOPACK unreachable",
            persistSession: true,
            autoRefreshToken: true
        }
    });
}
let _supabase;
const supabase = new Proxy({}, {
    get (_, prop, receiver) {
        if (!_supabase) _supabase = createSupabaseClient();
        return Reflect.get(_supabase, prop, receiver);
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/lib/cloud/tasksSync.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isUuid",
    ()=>isUuid,
    "newUuid",
    ()=>newUuid,
    "pullTasks",
    ()=>pullTasks,
    "pushTaskOp",
    ()=>pushTaskOp,
    "rowToTask",
    ()=>rowToTask,
    "taskToInsert",
    ()=>taskToInsert,
    "taskToUpdate",
    ()=>taskToUpdate
]);
// ─────────────────────────────────────────────────────────────────────────────
// Tasks ↔ Supabase mapping + pull/push helpers.
// Conflict resolution: Last-Write-Wins on `updated_at` (server) vs
// `updatedAt` (local snapshot at op-enqueue time).
// ─────────────────────────────────────────────────────────────────────────────
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/supabase/client.ts [app-client] (ecmascript)");
;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isUuid(id) {
    return UUID_RE.test(id);
}
function newUuid() {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }
    // RFC4122-ish fallback
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c)=>{
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}
function toDbStatus(s) {
    return s === 'active' ? 'in_progress' : s;
}
function fromDbStatus(s) {
    return s === 'in_progress' ? 'active' : s;
}
function rowToTask(row) {
    return {
        id: row.id,
        title: row.title,
        description: row.description ?? undefined,
        notes: row.notes ?? undefined,
        priority: row.priority,
        status: fromDbStatus(row.status),
        estimatedPomodoros: row.estimated_pomodoros ?? 1,
        completedPomodoros: row.completed_pomodoros ?? 0,
        createdAt: row.created_at,
        completedAt: row.completed_at ?? undefined,
        updatedAt: row.updated_at,
        _position: row.position ?? 0
    };
}
function taskToInsert(task, userId, position) {
    return {
        id: task.id,
        user_id: userId,
        title: task.title,
        description: task.description ?? null,
        notes: task.notes ?? null,
        status: toDbStatus(task.status),
        priority: task.priority,
        estimated_pomodoros: task.estimatedPomodoros,
        completed_pomodoros: task.completedPomodoros,
        completed_at: task.completedAt ?? null,
        position,
        created_at: task.createdAt,
        updated_at: task.updatedAt ?? new Date().toISOString()
    };
}
function taskToUpdate(payload) {
    const out = {};
    if (payload.title !== undefined) out.title = payload.title;
    if (payload.description !== undefined) out.description = payload.description ?? null;
    if (payload.notes !== undefined) out.notes = payload.notes ?? null;
    if (payload.status !== undefined) out.status = toDbStatus(payload.status);
    if (payload.priority !== undefined) out.priority = payload.priority;
    if (payload.estimatedPomodoros !== undefined) out.estimated_pomodoros = payload.estimatedPomodoros;
    if (payload.completedPomodoros !== undefined) out.completed_pomodoros = payload.completedPomodoros;
    if (payload.completedAt !== undefined) out.completed_at = payload.completedAt ?? null;
    if (payload.position !== undefined) out.position = payload.position;
    out.updated_at = payload.updatedAt ?? new Date().toISOString();
    return out;
}
async function pullTasks(userId) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('tasks').select('*').eq('user_id', userId).order('position', {
        ascending: true
    });
    if (error) throw error;
    return (data ?? []).map((row)=>rowToTask(row));
}
async function pushTaskOp(userId, op) {
    if (op.entity !== 'task') return;
    if (op.type === 'delete') {
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('tasks').delete().eq('id', op.entityId).eq('user_id', userId);
        if (error) throw error;
        return;
    }
    if (op.type === 'create') {
        const payload = op.payload;
        const row = taskToInsert(payload, userId, payload.position ?? 0);
        // upsert so a retried create doesn't fail with unique-violation
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('tasks').upsert(row, {
            onConflict: 'id'
        });
        if (error) throw error;
        return;
    }
    // update — apply LWW: only overwrite if our clientUpdatedAt >= server updated_at
    const updates = taskToUpdate(op.payload ?? {});
    updates.updated_at = op.clientUpdatedAt;
    const { data: existing, error: readErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('tasks').select('updated_at').eq('id', op.entityId).eq('user_id', userId).maybeSingle();
    if (readErr) throw readErr;
    if (existing && existing.updated_at > op.clientUpdatedAt) {
        // Server is newer — drop this op silently (LWW).
        return;
    }
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('tasks').update(updates).eq('id', op.entityId).eq('user_id', userId);
    if (error) throw error;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/lib/cloud/sessionsSync.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pushCycleOp",
    ()=>pushCycleOp,
    "pushSessionOp",
    ()=>pushSessionOp,
    "toDbSessionType",
    ()=>toDbSessionType
]);
// ─────────────────────────────────────────────────────────────────────────────
// Pomodoro sessions & cycles → Supabase (append-only push).
// ─────────────────────────────────────────────────────────────────────────────
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/supabase/client.ts [app-client] (ecmascript)");
;
function toDbSessionType(mode) {
    if (mode === 'pomodoro') return 'focus';
    if (mode === 'shortBreak') return 'short_break';
    return 'long_break';
}
async function pushSessionOp(userId, op) {
    if (op.type !== 'create') return; // sessions are append-only
    const p = op.payload;
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('pomodoro_sessions').upsert({
        ...p,
        user_id: userId
    }, {
        onConflict: 'id'
    });
    if (error) throw error;
}
async function pushCycleOp(userId, op) {
    if (op.type === 'create') {
        const p = op.payload;
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('pomodoro_cycles').upsert({
            ...p,
            user_id: userId
        }, {
            onConflict: 'id'
        });
        if (error) throw error;
        return;
    }
    if (op.type === 'update') {
        const p = op.payload;
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('pomodoro_cycles').update(p).eq('id', op.entityId).eq('user_id', userId);
        if (error) throw error;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/lib/cloud/notificationsSync.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pullNotifications",
    ()=>pullNotifications,
    "pushNotificationOp",
    ()=>pushNotificationOp
]);
// ─────────────────────────────────────────────────────────────────────────────
// Notifications ↔ Supabase.
// Local domain has 4 types (session_complete / break_complete / task_complete /
// goal_achieved) — the DB enum is a generic (info/success/warning/error/reminder).
// We collapse to 'reminder' for pomodoro events and 'success' for goals.
// The original local type is preserved in the JSONB `data` column.
// ─────────────────────────────────────────────────────────────────────────────
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/supabase/client.ts [app-client] (ecmascript)");
;
function toDbType(t) {
    if (t === 'goal_achieved' || t === 'task_complete') return 'success';
    return 'reminder';
}
function fromDbType(t, fallback = 'session_complete') {
    return t === 'success' ? 'task_complete' : fallback;
}
async function pushNotificationOp(userId, op) {
    if (op.type === 'create') {
        const n = op.payload;
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('notifications').upsert({
            id: n.id,
            user_id: userId,
            type: toDbType(n.type),
            title: n.title,
            message: n.message,
            is_read: n.read,
            read_at: n.read ? new Date().toISOString() : null,
            created_at: n.timestamp,
            data: {
                local_type: n.type
            }
        }, {
            onConflict: 'id'
        });
        if (error) throw error;
        return;
    }
    if (op.type === 'update') {
        const patch = op.payload;
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('notifications').update({
            is_read: patch.read ?? true,
            read_at: patch.read === false ? null : new Date().toISOString()
        }).eq('id', op.entityId).eq('user_id', userId);
        if (error) throw error;
    }
}
async function pullNotifications(userId) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('notifications').select('id, type, title, message, is_read, created_at, data').eq('user_id', userId).order('created_at', {
        ascending: false
    }).limit(50);
    if (error) throw error;
    return (data ?? []).map((row)=>{
        const localFromData = row.data && typeof row.data === 'object' && 'local_type' in row.data ? row.data.local_type : undefined;
        return {
            id: row.id,
            type: localFromData ?? fromDbType(row.type),
            title: row.title,
            message: row.message ?? '',
            timestamp: row.created_at,
            read: row.is_read
        };
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/lib/cloud/settingsSync.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pullSettings",
    ()=>pullSettings,
    "pushProfileOp",
    ()=>pushProfileOp,
    "pushSettingsOp",
    ()=>pushSettingsOp
]);
// ─────────────────────────────────────────────────────────────────────────────
// User settings ↔ Supabase (upsert on change, pull on start).
// Fields not covered by the DB schema (sound flags, dailyGoal, activeSounds)
// live in the `extra` jsonb column so nothing is lost.
// ─────────────────────────────────────────────────────────────────────────────
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/domain/pomodoro/timer.types.ts [app-client] (ecmascript)");
;
;
async function pushSettingsOp(userId, op) {
    if (op.type !== 'create' && op.type !== 'update') return;
    const p = op.payload;
    const s = p.settings;
    // Merge into existing `extra` so a partial push (e.g. only activeTimer)
    // doesn't wipe unrelated fields like userName/goals.
    const { data: existing } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('user_settings').select('extra').eq('user_id', userId).maybeSingle();
    const currentExtra = existing?.extra ?? {};
    const nextExtra = {
        ...currentExtra,
        uiSoundsEnabled: s.uiSoundsEnabled,
        hoverSoundsEnabled: s.hoverSoundsEnabled,
        requireTaskForSession: s.requireTaskForSession,
        dailyGoal: p.dailyGoal ?? s.dailyGoal
    };
    if (p.weeklyGoal !== undefined) nextExtra.weeklyGoal = p.weeklyGoal;
    if (p.monthlyGoal !== undefined) nextExtra.monthlyGoal = p.monthlyGoal;
    if (p.soundVolume !== undefined) nextExtra.soundVolume = p.soundVolume;
    if (p.activeSounds !== undefined) nextExtra.activeSounds = p.activeSounds;
    if (p.userName !== undefined) nextExtra.userName = p.userName;
    if (p.activeTimer !== undefined) nextExtra.activeTimer = p.activeTimer;
    const row = {
        user_id: userId,
        theme: s.theme,
        notifications_enabled: s.notificationsEnabled,
        sound_enabled: s.soundEnabled,
        pomodoro_duration_minutes: s.pomodoroDuration,
        short_break_duration_minutes: s.shortBreakDuration,
        long_break_duration_minutes: s.longBreakDuration,
        auto_start_breaks: s.autoStartBreaks,
        auto_start_pomodoros: s.autoStartSessions,
        extra: nextExtra
    };
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('user_settings').upsert(row, {
        onConflict: 'user_id'
    });
    if (error) throw error;
}
async function pullSettings(userId) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('user_settings').select('*').eq('user_id', userId).maybeSingle();
    if (error) throw error;
    if (!data) return null;
    const extra = data.extra ?? {};
    const settings = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SETTINGS"],
        pomodoroDuration: data.pomodoro_duration_minutes ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SETTINGS"].pomodoroDuration,
        shortBreakDuration: data.short_break_duration_minutes ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SETTINGS"].shortBreakDuration,
        longBreakDuration: data.long_break_duration_minutes ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SETTINGS"].longBreakDuration,
        autoStartBreaks: !!data.auto_start_breaks,
        autoStartSessions: !!data.auto_start_pomodoros,
        notificationsEnabled: data.notifications_enabled ?? true,
        soundEnabled: data.sound_enabled ?? true,
        uiSoundsEnabled: extra.uiSoundsEnabled ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SETTINGS"].uiSoundsEnabled,
        hoverSoundsEnabled: extra.hoverSoundsEnabled ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SETTINGS"].hoverSoundsEnabled,
        requireTaskForSession: extra.requireTaskForSession ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SETTINGS"].requireTaskForSession,
        theme: data.theme ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SETTINGS"].theme,
        dailyGoal: extra.dailyGoal ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SETTINGS"].dailyGoal
    };
    return {
        settings,
        dailyGoal: extra.dailyGoal,
        weeklyGoal: extra.weeklyGoal,
        monthlyGoal: extra.monthlyGoal,
        soundVolume: extra.soundVolume,
        activeSounds: extra.activeSounds,
        userName: extra.userName,
        activeTimer: extra.activeTimer ?? null
    };
}
async function pushProfileOp(userId, op) {
    if (op.type !== 'update') return;
    const p = op.payload;
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('profiles').update(p).eq('id', userId);
    if (error) throw error;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/lib/cloud/realtime.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ─────────────────────────────────────────────────────────────────────────────
// Cross-Device Realtime — Supabase postgres_changes subscriptions.
//
// A single manager owns all channels for the signed-in user. Each channel is
// filtered by user_id so only that account's rows are broadcast.
//
// Echo suppression: whenever the local device pushes a mutation via the sync
// queue, `markLocalEcho(entity, entityId)` is called; realtime events whose
// updated_at/created_at is within the recent window and matches an echoed id
// are ignored to prevent the local optimistic state from being overwritten
// with the server-round-tripped copy (which would flicker the UI).
// ─────────────────────────────────────────────────────────────────────────────
__turbopack_context__.s([
    "getDeviceId",
    ()=>getDeviceId,
    "markLocalEcho",
    ()=>markLocalEcho,
    "startRealtime",
    ()=>startRealtime,
    "stopRealtime",
    ()=>stopRealtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/stores/rootStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$settingsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/cloud/settingsSync.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$tasksSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/cloud/tasksSync.ts [app-client] (ecmascript)");
;
;
;
;
const channels = [];
const echoes = new Map();
const ECHO_TTL = 4000;
function echoKey(entity, entityId) {
    return `${entity}:${entityId}`;
}
function markLocalEcho(entity, entityId) {
    echoes.set(echoKey(entity, entityId), Date.now());
}
function isRecentEcho(entity, entityId) {
    const t = echoes.get(echoKey(entity, entityId));
    if (!t) return false;
    if (Date.now() - t > ECHO_TTL) {
        echoes.delete(echoKey(entity, entityId));
        return false;
    }
    return true;
}
function applyTaskEvent(payload) {
    const { eventType, new: newRow, old: oldRow } = payload;
    const id = newRow?.id ?? oldRow?.id;
    if (!id) return;
    if (isRecentEcho('task', id)) return;
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRootStore"].getState();
    if (eventType === 'DELETE') {
        if (!state.tasks.some((t)=>t.id === id)) return;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRootStore"].setState({
            tasks: state.tasks.filter((t)=>t.id !== id),
            activeTaskId: state.activeTaskId === id ? null : state.activeTaskId
        });
        return;
    }
    const incoming = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$tasksSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rowToTask"])(newRow);
    const idx = state.tasks.findIndex((t)=>t.id === id);
    const next = [
        ...state.tasks
    ];
    if (idx >= 0) {
        const local = state.tasks[idx];
        const localUpdated = local.updatedAt ?? local.createdAt;
        // LWW: only apply if the server row is same-or-newer than local.
        if (incoming.updatedAt < localUpdated) return;
        next[idx] = incoming;
    } else {
        next.push(incoming);
    }
    // Keep the array roughly ordered by server position so reorders on device A
    // land in the same order on device B.
    next.sort((a, b)=>{
        const pa = a._position ?? 0;
        const pb = b._position ?? 0;
        return pa - pb;
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRootStore"].setState({
        tasks: next
    });
}
function rowToNotif(row) {
    const local = row.data?.local_type;
    return {
        id: row.id,
        type: local ?? (row.type === 'success' ? 'task_complete' : 'session_complete'),
        title: row.title,
        message: row.message,
        read: !!row.is_read,
        timestamp: row.created_at
    };
}
function applyNotifEvent(payload) {
    const { eventType, new: newRow, old: oldRow } = payload;
    const id = newRow?.id ?? oldRow?.id;
    if (!id) return;
    if (isRecentEcho('notification', id)) return;
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRootStore"].getState();
    if (eventType === 'DELETE') {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRootStore"].setState({
            notifications: state.notifications.filter((n)=>n.id !== id)
        });
        return;
    }
    const incoming = rowToNotif(newRow);
    const idx = state.notifications.findIndex((n)=>n.id === id);
    const next = [
        ...state.notifications
    ];
    if (idx >= 0) next[idx] = incoming;
    else next.unshift(incoming);
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRootStore"].setState({
        notifications: next.slice(0, 50)
    });
}
// ── User settings (includes timer snapshot + name/goals/sounds) ─────────────
async function applySettingsEvent(userId) {
    if (isRecentEcho('setting', 'self')) return;
    try {
        const pulled = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$settingsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pullSettings"])(userId);
        if (!pulled) return;
        const patch = {
            settings: pulled.settings
        };
        if (pulled.dailyGoal !== undefined) patch.dailyGoal = pulled.dailyGoal;
        if (pulled.weeklyGoal !== undefined) patch.weeklyGoal = pulled.weeklyGoal;
        if (pulled.monthlyGoal !== undefined) patch.monthlyGoal = pulled.monthlyGoal;
        if (pulled.soundVolume !== undefined) patch.soundVolume = pulled.soundVolume;
        if (pulled.activeSounds !== undefined) patch.activeSounds = pulled.activeSounds;
        if (pulled.userName !== undefined) patch.userName = pulled.userName;
        // Mirror the remote timer snapshot when it originated from a different
        // device. When the local device is the owner, skip so we don't flap our
        // own state.
        const t = pulled.activeTimer;
        const myDevice = getDeviceId();
        if (t && t.deviceId && t.deviceId !== myDevice) {
            patch.mode = t.mode;
            patch.timeLeft = t.timeLeft;
            patch.isRunning = t.isRunning;
            patch.sessionInProgress = t.sessionInProgress;
            patch.sessionStartedAt = t.sessionStartedAt;
            patch.activeTaskId = t.activeTaskId;
            patch.sessionCount = t.sessionCount ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRootStore"].getState().sessionCount;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRootStore"].setState(patch);
    } catch (e) {
        console.warn('[realtime] settings apply failed', e);
    }
}
async function refreshDailyStats(userId) {
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('daily_statistics').select('date, focus_minutes, completed_sessions, completed_tasks').eq('user_id', userId).order('date', {
            ascending: false
        }).limit(60);
        if (error) throw error;
        const rows = data ?? [];
        const dailyHistory = rows.map((r)=>({
                date: r.date,
                sessions: r.completed_sessions,
                focusMinutes: r.focus_minutes
            }));
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRootStore"].setState({
            dailyHistory
        });
    } catch (e) {
        console.warn('[realtime] daily stats refresh failed', e);
    }
}
async function applySessionEvent(payload, userId) {
    if (payload.eventType !== 'INSERT') return;
    const row = payload.new;
    if (!row.completed) return;
    if (isRecentEcho('session', row.id)) return;
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRootStore"].getState();
    if (state.sessionHistory.some((s)=>s.id === row.id)) return;
    const task = state.tasks.find((t)=>t.id === row.task_id);
    const item = {
        id: row.id,
        taskId: row.task_id,
        taskTitle: task?.title ?? null,
        mode: row.session_type === 'focus' ? 'pomodoro' : row.session_type === 'short_break' ? 'shortBreak' : 'longBreak',
        duration: Math.round(row.duration_seconds / 60),
        completedAt: row.ended_at ?? new Date().toISOString()
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRootStore"].setState({
        sessionHistory: [
            item,
            ...state.sessionHistory
        ].slice(0, 100)
    });
    // Stats will be refreshed by the daily_statistics trigger fanout.
    void refreshDailyStats(userId);
}
async function startRealtime(userId) {
    stopRealtime();
    const filter = `user_id=eq.${userId}`;
    const tasksCh = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel(`rt:tasks:${userId}`).on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'tasks',
        filter
    }, applyTaskEvent).subscribe();
    const notifCh = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel(`rt:notifications:${userId}`).on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'notifications',
        filter
    }, applyNotifEvent).subscribe();
    const settingsCh = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel(`rt:user_settings:${userId}`).on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_settings',
        filter
    }, ()=>{
        void applySettingsEvent(userId);
    }).subscribe();
    const statsCh = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel(`rt:daily_statistics:${userId}`).on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'daily_statistics',
        filter
    }, ()=>{
        void refreshDailyStats(userId);
    }).subscribe();
    const sessionsCh = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel(`rt:pomodoro_sessions:${userId}`).on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'pomodoro_sessions',
        filter
    }, (p)=>{
        void applySessionEvent(p, userId);
    }).subscribe();
    channels.push(tasksCh, notifCh, settingsCh, statsCh, sessionsCh);
    // Initial stats hydration so device B sees today's numbers on load.
    void refreshDailyStats(userId);
}
function stopRealtime() {
    while(channels.length > 0){
        const ch = channels.pop();
        if (ch) void __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(ch);
    }
    echoes.clear();
}
// ── Device id (per browser install) ─────────────────────────────────────────
const DEVICE_KEY = 'focusflow:deviceId';
function getDeviceId() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    let id = window.localStorage.getItem(DEVICE_KEY);
    if (!id) {
        id = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `dev-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
        window.localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/lib/cloud/syncQueue.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ─────────────────────────────────────────────────────────────────────────────
// Local Sync Queue
//
// Persists pending mutations to localStorage so they survive reloads and can
// be flushed once the network/auth is available. One queue per signed-in
// user; guest sessions share the "guest" bucket but are never flushed.
// ─────────────────────────────────────────────────────────────────────────────
__turbopack_context__.s([
    "enqueue",
    ()=>enqueue,
    "markOpError",
    ()=>markOpError,
    "queueSize",
    ()=>queueSize,
    "readQueue",
    ()=>readQueue,
    "removeOp",
    ()=>removeOp,
    "writeQueue",
    ()=>writeQueue
]);
const STORAGE_PREFIX = 'focusflow:syncQueue:';
function key(userId) {
    return `${STORAGE_PREFIX}${userId}`;
}
function safeParse(raw) {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch  {
        return [];
    }
}
function readQueue(userId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return safeParse(window.localStorage.getItem(key(userId)));
}
function writeQueue(userId, ops) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (ops.length === 0) window.localStorage.removeItem(key(userId));
    else window.localStorage.setItem(key(userId), JSON.stringify(ops));
}
function enqueue(userId, op) {
    const ops = readQueue(userId);
    // Coalesce: if a pending op for the same entityId+entity exists and the
    // incoming op is an update, merge payloads (LWW client side) instead of
    // appending a second op. For create→update, keep create with merged payload.
    // For *→delete, drop earlier ops for the same entityId and enqueue delete.
    if (op.type === 'delete') {
        const filtered = ops.filter((o)=>!(o.entity === op.entity && o.entityId === op.entityId));
        // If the only thing in the queue was a create that never reached the
        // server, we can simply drop it — nothing to delete remotely.
        const hadOnlyCreate = ops.length !== filtered.length && ops.every((o)=>!(o.entity === op.entity && o.entityId === op.entityId) || o.type === 'create');
        if (hadOnlyCreate) {
            writeQueue(userId, filtered);
            return;
        }
        filtered.push({
            ...op,
            id: makeOpId(),
            retries: 0
        });
        writeQueue(userId, filtered);
        return;
    }
    const existingIdx = ops.findIndex((o)=>o.entity === op.entity && o.entityId === op.entityId && (o.type === 'create' || o.type === 'update') && !o.lastError);
    if (existingIdx >= 0) {
        const existing = ops[existingIdx];
        ops[existingIdx] = {
            ...existing,
            type: existing.type === 'create' ? 'create' : op.type,
            payload: {
                ...existing.payload,
                ...op.payload
            },
            clientUpdatedAt: op.clientUpdatedAt
        };
        writeQueue(userId, ops);
        return;
    }
    ops.push({
        ...op,
        id: makeOpId(),
        retries: 0
    });
    writeQueue(userId, ops);
}
function removeOp(userId, opId) {
    writeQueue(userId, readQueue(userId).filter((o)=>o.id !== opId));
}
function markOpError(userId, opId, error) {
    const ops = readQueue(userId);
    const idx = ops.findIndex((o)=>o.id === opId);
    if (idx < 0) return;
    ops[idx] = {
        ...ops[idx],
        retries: ops[idx].retries + 1,
        lastError: error
    };
    writeQueue(userId, ops);
}
function queueSize(userId) {
    return readQueue(userId).length;
}
function makeOpId() {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }
    return `op-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/lib/cloud/sync.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "enqueueOp",
    ()=>enqueueOp,
    "enqueueTaskOp",
    ()=>enqueueTaskOp,
    "getSyncStatus",
    ()=>getSyncStatus,
    "isCloudSyncEnabled",
    ()=>isCloudSyncEnabled,
    "setCloudSyncEnabled",
    ()=>setCloudSyncEnabled,
    "setMigrationHandler",
    ()=>setMigrationHandler,
    "startSync",
    ()=>startSync,
    "stopSync",
    ()=>stopSync,
    "subscribeSyncStatus",
    ()=>subscribeSyncStatus
]);
// ─────────────────────────────────────────────────────────────────────────────
// Offline-First Sync Engine — Phase 2 (Tasks proof-of-concept).
//
// Responsibilities
//  • Track online/offline + sync status with a tiny pub/sub.
//  • On sign-in:  pull tasks from Supabase, LWW-merge into local store,
//                 then flush any queued local mutations.
//  • On sign-out: stop listeners and clear status.
//  • Listen to `online` / `visibilitychange` to retry the queue.
//
// Public API is kept stable for existing UI imports (status hooks, account
// panel toggle, migration dialog). Stubs remain for the migration handler so
// older callers still compile while the migration path is being rebuilt.
// ─────────────────────────────────────────────────────────────────────────────
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/stores/rootStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$tasksSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/cloud/tasksSync.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sessionsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/cloud/sessionsSync.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$notificationsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/cloud/notificationsSync.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$settingsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/cloud/settingsSync.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$realtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/cloud/realtime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$syncQueue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/cloud/syncQueue.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
// ── Internal state ──────────────────────────────────────────────────────────
const ENABLED_KEY = 'focusflow:cloudSyncEnabled';
let current = {
    status: 'disabled',
    lastSyncedAt: null,
    pending: 0
};
const listeners = new Set();
let activeUserId = null;
let syncVersion = 0;
let flushing = false;
let onlineHandler = null;
let visibilityHandler = null;
let enabled = readEnabledFlag();
function readEnabledFlag() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const v = window.localStorage.getItem(ENABLED_KEY);
    return v === null ? true : v === '1';
}
function writeEnabledFlag(v) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.localStorage.setItem(ENABLED_KEY, v ? '1' : '0');
}
function setState(patch) {
    const next = {
        ...current,
        ...patch
    };
    const changed = next.status !== current.status || next.lastSyncedAt !== current.lastSyncedAt || next.pending !== current.pending;
    current = next;
    if (!changed) return;
    listeners.forEach((l)=>{
        try {
            l(current);
        } catch  {
        /* ignore */ }
    });
}
function refreshPending() {
    if (!activeUserId) return setState({
        pending: 0
    });
    setState({
        pending: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$syncQueue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queueSize"])(activeUserId)
    });
}
function getSyncStatus() {
    return current;
}
function subscribeSyncStatus(listener) {
    listeners.add(listener);
    listener(current);
    return ()=>{
        listeners.delete(listener);
    };
}
function isCloudSyncEnabled() {
    return enabled;
}
async function setCloudSyncEnabled(value, userId) {
    enabled = value;
    writeEnabledFlag(value);
    if (!value) {
        await stopSync();
        setState({
            status: 'disabled'
        });
        return;
    }
    if (userId) await startSync(userId);
}
function setMigrationHandler(_handler) {
/* no-op until the migration path is reintroduced */ }
function enqueueOp(entity, type, entityId, payload) {
    if (!enabled || !activeUserId) return;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$syncQueue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueue"])(activeUserId, {
        entity,
        type,
        entityId,
        payload: payload ?? {},
        clientUpdatedAt: new Date().toISOString()
    });
    // Suppress the realtime echo of our own change so the UI doesn't flicker
    // when the server round-trips the row back to us.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$realtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markLocalEcho"])(entity, entityId);
    refreshPending();
    // Fire-and-forget flush; will no-op if offline or already flushing.
    void flushQueue();
}
function enqueueTaskOp(type, entityId, payload) {
    enqueueOp('task', type, entityId, payload);
}
async function pushOp(userId, op) {
    switch(op.entity){
        case 'task':
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$tasksSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushTaskOp"])(userId, op);
        case 'session':
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sessionsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushSessionOp"])(userId, op);
        case 'cycle':
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sessionsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushCycleOp"])(userId, op);
        case 'notification':
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$notificationsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushNotificationOp"])(userId, op);
        case 'setting':
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$settingsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushSettingsOp"])(userId, op);
        case 'profile':
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$settingsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushProfileOp"])(userId, op);
    }
}
async function startSync(userId) {
    if (!userId) return;
    if (!enabled) {
        setState({
            status: 'disabled'
        });
        return;
    }
    activeUserId = userId;
    const myVersion = ++syncVersion;
    setState({
        status: 'syncing'
    });
    // Normalise any local tasks with non-uuid ids so they can sync.
    normalizeLocalTaskIds();
    // 1) Pull, merge, then 2) flush queue, then 3) subscribe to realtime.
    try {
        await pullAndMerge(userId);
        if (syncVersion !== myVersion) return; // a newer startSync superseded us
        await pullSecondary(userId);
        if (syncVersion !== myVersion) return;
        await flushQueue();
        if (syncVersion !== myVersion) return;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$realtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startRealtime"])(userId);
        setState({
            status: isOnline() ? 'synced' : 'offline',
            lastSyncedAt: Date.now()
        });
    } catch (e) {
        console.error('[sync] start failed', e);
        setState({
            status: isOnline() ? 'error' : 'offline'
        });
    }
    // Wire retry triggers.
    if ("TURBOPACK compile-time truthy", 1) {
        onlineHandler = ()=>{
            void flushQueue();
        };
        visibilityHandler = ()=>{
            if (document.visibilityState === 'visible') void flushQueue();
        };
        window.addEventListener('online', onlineHandler);
        window.addEventListener('offline', handleOffline);
        document.addEventListener('visibilitychange', visibilityHandler);
    }
}
function handleOffline() {
    setState({
        status: 'offline'
    });
}
async function stopSync() {
    activeUserId = null;
    ++syncVersion; // cancel any in-flight startSync
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$realtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopRealtime"])();
    if ("TURBOPACK compile-time truthy", 1) {
        if (onlineHandler) window.removeEventListener('online', onlineHandler);
        window.removeEventListener('offline', handleOffline);
        if (visibilityHandler) document.removeEventListener('visibilitychange', visibilityHandler);
        onlineHandler = null;
        visibilityHandler = null;
    }
    setState({
        status: 'disabled',
        pending: 0
    });
}
// ── Internals ───────────────────────────────────────────────────────────────
function isOnline() {
    if (typeof navigator === 'undefined') return true;
    return navigator.onLine !== false;
}
function normalizeLocalTaskIds() {
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRootStore"].getState();
    let changed = false;
    const mapping = new Map();
    const tasks = state.tasks.map((t)=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$tasksSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUuid"])(t.id)) return t;
        const next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$tasksSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["newUuid"])();
        mapping.set(t.id, next);
        changed = true;
        return {
            ...t,
            id: next
        };
    });
    if (!changed) return;
    const activeTaskId = state.activeTaskId ? mapping.get(state.activeTaskId) ?? state.activeTaskId : state.activeTaskId;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRootStore"].setState({
        tasks,
        activeTaskId
    });
}
async function pullAndMerge(userId) {
    const serverTasks = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$tasksSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pullTasks"])(userId);
    const local = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRootStore"].getState().tasks;
    const byId = new Map();
    local.forEach((t)=>byId.set(t.id, t));
    // Tasks present locally but not on server: keep + enqueue create (they were
    // authored before sync started, or while offline).
    const serverIds = new Set(serverTasks.map((t)=>t.id));
    local.forEach((t, idx)=>{
        if (!serverIds.has(t.id)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$syncQueue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueue"])(userId, {
                entity: 'task',
                type: 'create',
                entityId: t.id,
                payload: {
                    ...t,
                    position: idx,
                    updatedAt: t.updatedAt ?? t.createdAt
                },
                clientUpdatedAt: t.updatedAt ?? t.createdAt
            });
        }
    });
    // Apply server rows with LWW.
    serverTasks.forEach((srv)=>{
        const loc = byId.get(srv.id);
        if (!loc) {
            byId.set(srv.id, srv);
            return;
        }
        const locUpdated = loc.updatedAt ?? loc.createdAt;
        if (srv.updatedAt >= locUpdated) {
            byId.set(srv.id, srv);
        } // else local wins; existing queued op will push it.
    });
    const merged = Array.from(byId.values());
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRootStore"].setState({
        tasks: merged
    });
    refreshPending();
}
async function pullSecondary(userId) {
    // Notifications: last-write-wins by id — server rows replace local ones, and
    // any local-only notifications remain (they'll push up via the queue).
    try {
        const [remoteNotifs, remoteSettings] = await Promise.all([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$notificationsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pullNotifications"])(userId),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$settingsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pullSettings"])(userId)
        ]);
        const state = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRootStore"].getState();
        const seen = new Set(remoteNotifs.map((n)=>n.id));
        const localOnly = state.notifications.filter((n)=>!seen.has(n.id));
        const mergedNotifs = [
            ...remoteNotifs,
            ...localOnly
        ].slice(0, 50);
        const patch = {
            notifications: mergedNotifs
        };
        if (remoteSettings) {
            patch.settings = remoteSettings.settings;
            if (remoteSettings.dailyGoal !== undefined) patch.dailyGoal = remoteSettings.dailyGoal;
            if (remoteSettings.weeklyGoal !== undefined) patch.weeklyGoal = remoteSettings.weeklyGoal;
            if (remoteSettings.monthlyGoal !== undefined) patch.monthlyGoal = remoteSettings.monthlyGoal;
            if (remoteSettings.soundVolume !== undefined) patch.soundVolume = remoteSettings.soundVolume;
            if (remoteSettings.activeSounds !== undefined) patch.activeSounds = remoteSettings.activeSounds;
            if (remoteSettings.userName !== undefined) patch.userName = remoteSettings.userName;
            // Hydrate remote timer state (only if it came from a different device).
            const t = remoteSettings.activeTimer;
            const myDevice = ("TURBOPACK compile-time truthy", 1) ? window.localStorage.getItem('focusflow:deviceId') : "TURBOPACK unreachable";
            if (t && t.deviceId && t.deviceId !== myDevice) {
                patch.mode = t.mode;
                patch.timeLeft = t.timeLeft;
                patch.isRunning = t.isRunning;
                patch.sessionInProgress = t.sessionInProgress;
                patch.sessionStartedAt = t.sessionStartedAt;
                patch.activeTaskId = t.activeTaskId;
                patch.sessionCount = t.sessionCount;
            }
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRootStore"].setState(patch);
    } catch (e) {
        console.warn('[sync] pullSecondary failed', e);
    }
}
async function flushQueue() {
    if (!activeUserId || !enabled) return;
    if (!isOnline()) {
        setState({
            status: 'offline'
        });
        return;
    }
    if (flushing) return;
    flushing = true;
    setState({
        status: 'syncing'
    });
    try {
        const userId = activeUserId;
        let ops = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$syncQueue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readQueue"])(userId);
        while(ops.length > 0 && activeUserId === userId){
            const op = ops[0];
            // Skip ops that have failed too many times — they need manual attention.
            if (op.retries >= 5) {
                ops = ops.slice(1);
                // Move to the back so the rest of the queue still drains.
                const dead = {
                    ...op
                };
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$syncQueue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeQueue"])(userId, [
                    ...ops,
                    dead
                ]);
                ops = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$syncQueue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readQueue"])(userId);
                continue;
            }
            try {
                await pushOp(userId, op);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$syncQueue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeOp"])(userId, op.id);
            } catch (e) {
                const msg = e instanceof Error ? e.message : String(e);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$syncQueue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markOpError"])(userId, op.id, msg);
                // Stop the loop on the first failure so we don't hammer the API.
                // The next online/visibility event (or next mutation) will retry.
                setState({
                    status: 'error'
                });
                break;
            }
            ops = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$syncQueue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readQueue"])(userId);
        }
        refreshPending();
        if (current.status !== 'error') {
            setState({
                status: isOnline() ? 'synced' : 'offline',
                lastSyncedAt: Date.now()
            });
        }
    } finally{
        flushing = false;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/stores/slices/settingsSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSettingsSlice",
    ()=>createSettingsSlice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/domain/pomodoro/timer.types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/domain/pomodoro/timer.rules.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/cloud/sync.ts [app-client] (ecmascript)");
;
;
;
const createSettingsSlice = (set, get)=>({
        settings: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SETTINGS"],
        updateSettings: (partial)=>{
            const state = get();
            const updated = {
                ...state.settings,
                ...partial
            };
            const patch = {
                settings: updated
            };
            if (partial.dailyGoal !== undefined) patch.dailyGoal = partial.dailyGoal;
            if (!state.isRunning) {
                patch.timeLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["durationsFor"])(updated)[state.mode];
            }
            set(patch);
            const next = get();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueOp"])('setting', 'update', 'self', {
                settings: updated,
                dailyGoal: next.dailyGoal,
                weeklyGoal: next.weeklyGoal,
                monthlyGoal: next.monthlyGoal,
                soundVolume: next.soundVolume,
                activeSounds: next.activeSounds,
                userName: next.userName
            });
        }
    });
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/domain/tasks/task.rules.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "incrementPomodoro",
    ()=>incrementPomodoro,
    "isInactiveStatus",
    ()=>isInactiveStatus,
    "isSelectable",
    ()=>isSelectable,
    "reorderActive",
    ()=>reorderActive,
    "shouldAutoComplete",
    ()=>shouldAutoComplete
]);
function isSelectable(task) {
    return !!task && task.status !== 'completed' && task.status !== 'archived';
}
function isInactiveStatus(status) {
    return status === 'completed' || status === 'archived';
}
function incrementPomodoro(task, nowIso) {
    return {
        ...task,
        completedPomodoros: task.completedPomodoros + 1,
        updatedAt: nowIso
    };
}
function shouldAutoComplete(task, nextCompletedPomodoros) {
    return !!task && nextCompletedPomodoros >= task.estimatedPomodoros && task.status !== 'completed';
}
function reorderActive(tasks, fromIndex, toIndex) {
    const active = tasks.filter((t)=>t.status !== 'archived' && t.status !== 'completed');
    const others = tasks.filter((t)=>t.status === 'archived' || t.status === 'completed');
    const next = [
        ...active
    ];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    return [
        ...next,
        ...others
    ];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/lib/sounds.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "playUiSound",
    ()=>playUiSound,
    "playVolumeTick",
    ()=>playVolumeTick
]);
// Lightweight WebAudio UI sound helper. No external assets.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useRootStore__as__useStore$3e$__ = __turbopack_context__.i("[project]/src/app/stores/rootStore.ts [app-client] (ecmascript) <export useRootStore as useStore>");
;
let ctx = null;
function getCtx() {
    try {
        if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
        return ctx;
    } catch  {
        return null;
    }
}
function tone(freq, duration = 0.12, type = 'sine', gainVal = 0.18, delay = 0) {
    const c = getCtx();
    if (!c) return;
    const t0 = c.currentTime + delay;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gainVal, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(g);
    g.connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
}
function noiseBurst(duration = 0.08, gainVal = 0.08, filterFreq = 2000) {
    const c = getCtx();
    if (!c) return;
    const t0 = c.currentTime;
    const bufferSize = Math.max(1, Math.floor(c.sampleRate * duration));
    const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
    const data = buffer.getChannelData(0);
    for(let i = 0; i < bufferSize; i++)data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    const src = c.createBufferSource();
    src.buffer = buffer;
    const filter = c.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = filterFreq;
    const g = c.createGain();
    g.gain.setValueAtTime(gainVal, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    src.connect(filter);
    filter.connect(g);
    g.connect(c.destination);
    src.start(t0);
    src.stop(t0 + duration + 0.02);
}
function playVolumeTick(level) {
    try {
        const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useRootStore__as__useStore$3e$__["useStore"].getState().settings;
        if (!s.uiSoundsEnabled) return;
    } catch  {
        return;
    }
    const clamped = Math.max(0, Math.min(1, level));
    // Pitch sweeps 320Hz (mute) → 1200Hz (full). Gain scales with level too.
    const freq = 320 + clamped * 880;
    const gain = 0.05 + clamped * 0.18;
    tone(freq, 0.08, 'sine', gain);
}
function playUiSound(name) {
    try {
        const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useRootStore__as__useStore$3e$__["useStore"].getState().settings;
        if (!s.uiSoundsEnabled) return;
        // Per-category toggles (optional, default on)
        if (name === 'hover' && s.hoverSoundsEnabled === false) return;
    } catch  {
        return;
    }
    switch(name){
        case 'start':
            tone(660, 0.10, 'sine', 0.18);
            tone(990, 0.12, 'sine', 0.14, 0.07);
            break;
        case 'pause':
            tone(520, 0.10, 'sine', 0.16);
            tone(390, 0.12, 'sine', 0.14, 0.07);
            break;
        case 'reset':
            tone(440, 0.08, 'triangle', 0.14);
            break;
        case 'taskAdd':
            tone(880, 0.08, 'sine', 0.14);
            tone(1175, 0.06, 'sine', 0.10, 0.05);
            break;
        case 'taskDone':
            tone(784, 0.10, 'sine', 0.16);
            tone(1175, 0.14, 'sine', 0.14, 0.08);
            break;
        case 'taskDelete':
            tone(330, 0.06, 'triangle', 0.12);
            tone(220, 0.10, 'triangle', 0.12, 0.05);
            break;
        case 'taskArchive':
            tone(523, 0.06, 'sine', 0.12);
            tone(392, 0.10, 'sine', 0.10, 0.05);
            break;
        case 'taskRestore':
            tone(523, 0.06, 'sine', 0.12);
            tone(784, 0.08, 'sine', 0.12, 0.05);
            break;
        case 'modeSwitch':
            tone(700, 0.05, 'sine', 0.12);
            tone(900, 0.06, 'sine', 0.12, 0.04);
            break;
        case 'tabSwitch':
            tone(820, 0.04, 'sine', 0.10);
            break;
        case 'focusOn':
            tone(440, 0.08, 'sine', 0.14);
            tone(660, 0.10, 'sine', 0.14, 0.06);
            tone(880, 0.14, 'sine', 0.12, 0.13);
            break;
        case 'focusOff':
            tone(880, 0.08, 'sine', 0.14);
            tone(660, 0.10, 'sine', 0.14, 0.06);
            tone(440, 0.12, 'sine', 0.12, 0.13);
            break;
        case 'sessionComplete':
            tone(523, 0.12, 'sine', 0.16);
            tone(659, 0.12, 'sine', 0.16, 0.10);
            tone(784, 0.16, 'sine', 0.16, 0.20);
            tone(1046, 0.20, 'sine', 0.16, 0.32);
            break;
        case 'notify':
            tone(988, 0.08, 'sine', 0.14);
            tone(1318, 0.10, 'sine', 0.12, 0.06);
            break;
        case 'toggle':
            tone(700, 0.05, 'square', 0.08);
            break;
        case 'hover':
            noiseBurst(0.04, 0.025, 1600);
            break;
        case 'click':
            tone(600, 0.04, 'square', 0.08);
            break;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/stores/slices/tasksSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createTasksSlice",
    ()=>createTasksSlice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$tasks$2f$task$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/domain/tasks/task.rules.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/sounds.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/cloud/sync.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$tasksSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/cloud/tasksSync.ts [app-client] (ecmascript)");
;
;
;
;
const createTasksSlice = (set, get)=>({
        tasks: [],
        activeTaskId: null,
        addTask: (taskData)=>{
            const now = new Date().toISOString();
            const task = {
                ...taskData,
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$tasksSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["newUuid"])(),
                createdAt: now,
                updatedAt: now,
                completedPomodoros: 0,
                status: 'pending'
            };
            set({
                tasks: [
                    ...get().tasks,
                    task
                ]
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playUiSound"])('taskAdd');
            const position = get().tasks.length - 1;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueTaskOp"])('create', task.id, {
                ...task,
                position
            });
        },
        updateTask: (id, updates)=>{
            const before = get().tasks.find((t)=>t.id === id);
            const now = new Date().toISOString();
            const merged = {
                ...updates,
                updatedAt: now
            };
            set((state)=>{
                const tasks = state.tasks.map((t)=>t.id === id ? {
                        ...t,
                        ...merged
                    } : t);
                const becameInactive = state.activeTaskId === id && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$tasks$2f$task$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInactiveStatus"])(updates.status);
                return {
                    tasks,
                    activeTaskId: becameInactive ? null : state.activeTaskId
                };
            });
            if (before && before.status !== 'completed' && updates.status === 'completed') {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playUiSound"])('taskDone');
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueTaskOp"])('update', id, merged);
        },
        deleteTask: (id)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playUiSound"])('taskDelete');
            set((state)=>({
                    tasks: state.tasks.filter((t)=>t.id !== id),
                    activeTaskId: state.activeTaskId === id ? null : state.activeTaskId
                }));
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueTaskOp"])('delete', id, {});
        },
        archiveTask: (id)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playUiSound"])('taskArchive');
            const now = new Date().toISOString();
            set((state)=>({
                    tasks: state.tasks.map((t)=>t.id === id ? {
                            ...t,
                            status: 'archived',
                            archivedAt: now,
                            updatedAt: now
                        } : t),
                    activeTaskId: state.activeTaskId === id ? null : state.activeTaskId
                }));
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueTaskOp"])('update', id, {
                status: 'archived',
                updatedAt: now
            });
        },
        setActiveTask: (id)=>{
            const prev = get().activeTaskId;
            if (id) {
                const target = get().tasks.find((t)=>t.id === id);
                if (!target || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$tasks$2f$task$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInactiveStatus"])(target.status)) return;
            }
            set({
                activeTaskId: id,
                pendingTaskSwitch: null
            });
            if (id && id !== prev) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playUiSound"])('click');
        },
        // Guarded task-selection: if a pomodoro session is in progress on a different
        // task, defer the switch and surface a confirmation modal instead of silently
        // reassigning the running session.
        requestSetActiveTask: (id)=>{
            const state = get();
            if (id === state.activeTaskId) return;
            const target = state.tasks.find((t)=>t.id === id);
            if (!target || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$tasks$2f$task$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInactiveStatus"])(target.status)) return;
            const sessionLockedToTask = state.mode === 'pomodoro' && state.sessionInProgress && !!state.activeTaskId && state.activeTaskId !== id;
            if (sessionLockedToTask) {
                set({
                    pendingTaskSwitch: id
                });
                return;
            }
            set({
                activeTaskId: id,
                pendingTaskSwitch: null
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playUiSound"])('click');
        },
        reorderTasks: (fromIndex, toIndex)=>set((state)=>({
                    tasks: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$tasks$2f$task$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reorderActive"])(state.tasks, fromIndex, toIndex)
                })),
        moveTask: (fromId, overId)=>{
            if (fromId === overId) return;
            set((state)=>{
                const from = state.tasks.findIndex((t)=>t.id === fromId);
                const over = state.tasks.findIndex((t)=>t.id === overId);
                if (from === -1 || over === -1) return {};
                const next = state.tasks.slice();
                const [moved] = next.splice(from, 1);
                next.splice(over, 0, moved);
                return {
                    tasks: next
                };
            });
        },
        // Persist the new ordering to the server: enqueue a position update for
        // every active task so the row order matches the local array on every
        // signed-in device via realtime.
        commitReorder: ()=>{
            const state = get();
            const nowIso = new Date().toISOString();
            state.tasks.forEach((t, idx)=>{
                if (t.status === 'completed' || t.status === 'archived') return;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueTaskOp"])('update', t.id, {
                    position: idx,
                    updatedAt: nowIso
                });
            });
        }
    });
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/domain/stats/stats.rules.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appendDailyPomodoro",
    ()=>appendDailyPomodoro,
    "computeStreak",
    ()=>computeStreak,
    "pushHistory",
    ()=>pushHistory,
    "todayIso",
    ()=>todayIso
]);
function todayIso(date = new Date()) {
    return date.toISOString().split('T')[0];
}
function computeStreak(history, todaySessionsDelta) {
    const map = new Map(history.map((d)=>[
            d.date,
            d.sessions
        ]));
    const today = new Date();
    const todayStr = todayIso(today);
    const effectiveToday = (map.get(todayStr) ?? 0) + todaySessionsDelta;
    let streak = 0;
    const cursor = new Date(today);
    if (effectiveToday > 0) {
        streak = 1;
        cursor.setDate(cursor.getDate() - 1);
    } else {
        cursor.setDate(cursor.getDate() - 1);
    }
    while(true){
        const key = todayIso(cursor);
        if ((map.get(key) ?? 0) > 0) {
            streak += 1;
            cursor.setDate(cursor.getDate() - 1);
        } else break;
    }
    return streak;
}
function appendDailyPomodoro(history, minutes) {
    const day = todayIso();
    const idx = history.findIndex((d)=>d.date === day);
    if (idx >= 0) {
        const next = [
            ...history
        ];
        next[idx] = {
            ...next[idx],
            sessions: next[idx].sessions + 1,
            focusMinutes: next[idx].focusMinutes + minutes
        };
        return next;
    }
    return [
        ...history,
        {
            date: day,
            sessions: 1,
            focusMinutes: minutes
        }
    ];
}
function pushHistory(history, item, max = 50) {
    return [
        item,
        ...history
    ].slice(0, max);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/stores/slices/statsSlice.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createStatsSlice",
    ()=>createStatsSlice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$stats$2f$stats$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/domain/stats/stats.rules.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/cloud/sync.ts [app-client] (ecmascript)");
;
;
const createStatsSlice = (set, get)=>({
        dailyHistory: [],
        sessionHistory: [],
        totalSessions: 0,
        streak: 0,
        dailyGoal: 8,
        weeklyGoal: 40,
        monthlyGoal: 160,
        updateGoals: (goals)=>{
            set((state)=>({
                    dailyGoal: goals.daily ?? state.dailyGoal,
                    weeklyGoal: goals.weekly ?? state.weeklyGoal,
                    monthlyGoal: goals.monthly ?? state.monthlyGoal,
                    settings: goals.daily !== undefined ? {
                        ...state.settings,
                        dailyGoal: goals.daily
                    } : state.settings
                }));
            const s = get();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueOp"])('setting', 'update', 'self', {
                settings: s.settings,
                dailyGoal: s.dailyGoal,
                weeklyGoal: s.weeklyGoal,
                monthlyGoal: s.monthlyGoal,
                soundVolume: s.soundVolume,
                activeSounds: s.activeSounds,
                userName: s.userName
            });
        }
    });
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/domain/notifications/notification.factory.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "breakCompleteNotif",
    ()=>breakCompleteNotif,
    "makeNotification",
    ()=>makeNotification,
    "pushNotification",
    ()=>pushNotification,
    "sessionCompleteNotif",
    ()=>sessionCompleteNotif
]);
function id() {
    return `notif-${Date.now()}`;
}
function makeNotification(type, title, message) {
    return {
        id: id(),
        type,
        title,
        message,
        timestamp: new Date().toISOString(),
        read: false
    };
}
function sessionCompleteNotif(activeTaskTitle) {
    return makeNotification('session_complete', 'Session Complete', activeTaskTitle ? `Completed session on "${activeTaskTitle}"` : 'Focus session complete!');
}
function breakCompleteNotif() {
    return makeNotification('break_complete', 'Break Over', 'Ready to start your next focus session?');
}
function pushNotification(list, item, max = 20) {
    return [
        item,
        ...list
    ].slice(0, max);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/stores/slices/notificationsSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createNotificationsSlice",
    ()=>createNotificationsSlice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$notifications$2f$notification$2e$factory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/domain/notifications/notification.factory.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/cloud/sync.ts [app-client] (ecmascript)");
;
;
const createNotificationsSlice = (set, get)=>({
        notifications: [],
        addNotification: (item)=>{
            const notif = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$notifications$2f$notification$2e$factory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeNotification"])(item.type, item.title, item.message);
            set((state)=>({
                    notifications: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$notifications$2f$notification$2e$factory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushNotification"])(state.notifications, notif)
                }));
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueOp"])('notification', 'create', notif.id, notif);
        },
        markAllNotificationsRead: ()=>{
            const unreadIds = get().notifications.filter((n)=>!n.read).map((n)=>n.id);
            set((state)=>({
                    notifications: state.notifications.map((n)=>({
                            ...n,
                            read: true
                        }))
                }));
            unreadIds.forEach((id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueOp"])('notification', 'update', id, {
                    read: true
                }));
        }
    });
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/stores/slices/uiSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createUISlice",
    ()=>createUISlice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/sounds.ts [app-client] (ecmascript)");
;
const createUISlice = (set, get)=>({
        activeSounds: [],
        soundVolume: 0.5,
        isFocusMode: false,
        isSettingsOpen: false,
        completionModal: null,
        isCommandPaletteOpen: false,
        isNotificationCenterOpen: false,
        isAccountPanelOpen: false,
        noTaskWarning: false,
        pendingTaskSwitch: null,
        userName: 'Jordan Davis',
        toggleSound: (sound)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playUiSound"])('toggle');
            set((state)=>({
                    activeSounds: state.activeSounds.includes(sound) ? [] : [
                        sound
                    ]
                }));
        },
        setSoundVolume: (soundVolume)=>set({
                soundVolume
            }),
        setFocusMode: (isFocusMode)=>{
            const prev = get().isFocusMode;
            set({
                isFocusMode
            });
            if (isFocusMode !== prev) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playUiSound"])(isFocusMode ? 'focusOn' : 'focusOff');
        },
        setSettingsOpen: (isSettingsOpen)=>{
            set({
                isSettingsOpen
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playUiSound"])(isSettingsOpen ? 'tabSwitch' : 'click');
        },
        setCompletionModal: (completionModal)=>set({
                completionModal
            }),
        setCommandPaletteOpen: (isCommandPaletteOpen)=>set({
                isCommandPaletteOpen
            }),
        setNotificationCenterOpen: (isNotificationCenterOpen)=>set({
                isNotificationCenterOpen
            }),
        setAccountPanelOpen: (isAccountPanelOpen)=>set({
                isAccountPanelOpen
            }),
        setNoTaskWarning: (noTaskWarning)=>set({
                noTaskWarning
            }),
        setPendingTaskSwitch: (pendingTaskSwitch)=>set({
                pendingTaskSwitch
            }),
        setUserName: (userName)=>set({
                userName
            })
    });
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/services/browserNotification.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dispatchNoTaskEvent",
    ()=>dispatchNoTaskEvent,
    "notifySessionEnd",
    ()=>notifySessionEnd
]);
function notifySessionEnd(mode, enabled) {
    if (!enabled) return;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    new Notification(mode === 'pomodoro' ? 'Session complete' : 'Break over', {
        body: mode === 'pomodoro' ? 'Time for a break.' : 'Ready to focus again?'
    });
}
function dispatchNoTaskEvent() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.dispatchEvent(new CustomEvent('focusflow:no-task'));
    } catch  {
    /* noop */ }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/stores/slices/timerSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createTimerSlice",
    ()=>createTimerSlice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/domain/pomodoro/timer.rules.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$tasks$2f$task$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/domain/tasks/task.rules.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$stats$2f$stats$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/domain/stats/stats.rules.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$notifications$2f$notification$2e$factory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/domain/notifications/notification.factory.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/sounds.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$browserNotification$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/services/browserNotification.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/cloud/sync.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$tasksSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/cloud/tasksSync.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sessionsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/cloud/sessionsSync.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$realtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/cloud/realtime.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
// Broadcast the current timer snapshot to user_settings.extra.activeTimer so
// other signed-in devices can mirror it read-only. Called on transitions only
// (start/pause/reset/mode-switch/complete), never on per-second ticks.
function broadcastTimer(state) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueOp"])('setting', 'update', 'self', {
        settings: state.settings,
        dailyGoal: state.dailyGoal,
        weeklyGoal: state.weeklyGoal,
        monthlyGoal: state.monthlyGoal,
        soundVolume: state.soundVolume,
        activeSounds: state.activeSounds,
        userName: state.userName,
        activeTimer: {
            deviceId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$realtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDeviceId"])(),
            mode: state.mode,
            timeLeft: state.timeLeft,
            isRunning: state.isRunning,
            sessionInProgress: state.sessionInProgress,
            sessionStartedAt: state.sessionStartedAt,
            activeTaskId: state.activeTaskId,
            sessionCount: state.sessionCount,
            updatedAt: new Date().toISOString()
        }
    });
}
// ── completeSession helpers ──────────────────────────────────────────────────
// Each extracts a single responsibility from the original god function.
// Execution order is preserved by calling them in sequence inside completeSession.
function recordSessionHistoryItem(history, taskId, taskTitle, mode, durationMinutes, nowIso) {
    const item = {
        id: `hist-${Date.now()}`,
        taskId,
        taskTitle,
        mode,
        duration: durationMinutes,
        completedAt: nowIso
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$stats$2f$stats$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushHistory"])(history, item);
}
function syncTaskCompletionToCloud(tasks, activeTaskId, nowIso) {
    if (!activeTaskId) return tasks;
    const updatedTasks = tasks.map((t)=>t.id === activeTaskId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$tasks$2f$task$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["incrementPomodoro"])(t, nowIso) : t);
    const updated = updatedTasks.find((x)=>x.id === activeTaskId);
    if (updated) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueTaskOp"])('update', activeTaskId, {
            completedPomodoros: updated.completedPomodoros,
            updatedAt: nowIso
        });
    }
    return updatedTasks;
}
function handleCycleBookkeeping(currentCycleId, newSessionCount, startedAt, nowIso) {
    const positionInCycle = (newSessionCount - 1) % 4 + 1;
    let cycleId = currentCycleId;
    if (positionInCycle === 1) {
        cycleId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$tasksSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["newUuid"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueOp"])('cycle', 'create', cycleId, {
            id: cycleId,
            cycle_number: Math.ceil(newSessionCount / 4),
            completed_sessions: 0,
            started_at: startedAt,
            ended_at: null
        });
    }
    let nextCycleId = cycleId;
    if (positionInCycle === 4 && cycleId) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueOp"])('cycle', 'update', cycleId, {
            ended_at: nowIso,
            completed_sessions: 4
        });
        nextCycleId = null;
    }
    return {
        cycleId,
        nextCycleId
    };
}
function syncSessionRowToCloud(taskId, cycleId, mode, durationSeconds, startedAt, nowIso) {
    const sessionId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$tasksSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["newUuid"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueOp"])('session', 'create', sessionId, {
        id: sessionId,
        task_id: taskId,
        cycle_id: cycleId,
        session_type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sessionsSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDbSessionType"])(mode),
        duration_seconds: durationSeconds,
        started_at: startedAt,
        ended_at: nowIso,
        completed: true,
        interrupted: false
    });
}
function updateLocalStats(dailyHistory, pomodoroDuration) {
    const newHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$stats$2f$stats$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["appendDailyPomodoro"])(dailyHistory, pomodoroDuration);
    const streak = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$stats$2f$stats$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeStreak"])(newHistory, 0);
    return {
        dailyHistory: newHistory,
        streak
    };
}
function createAndSyncNotification(notif) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$cloud$2f$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueOp"])('notification', 'create', notif.id, notif);
    return notif;
}
const createTimerSlice = (set, get)=>({
        mode: 'pomodoro',
        timeLeft: 25 * 60,
        isRunning: false,
        sessionCount: 0,
        sessionInProgress: false,
        sessionStartedAt: null,
        currentCycleId: null,
        setMode: (mode)=>{
            const state = get();
            const durations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["durationsFor"])(state.settings);
            set({
                mode,
                timeLeft: durations[mode],
                isRunning: false,
                sessionInProgress: false,
                sessionStartedAt: null
            });
            if (state.mode !== mode) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playUiSound"])('modeSwitch');
            broadcastTimer(get());
        },
        setTimeLeft: (timeLeft)=>set({
                timeLeft
            }),
        setIsRunning: (isRunning)=>{
            const prev = get().isRunning;
            set({
                isRunning
            });
            if (isRunning && !prev) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playUiSound"])('start');
            else if (!isRunning && prev) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playUiSound"])('pause');
            if (prev !== isRunning) broadcastTimer(get());
        },
        requestStart: ()=>{
            const state = get();
            if (state.isRunning) {
                state.setIsRunning(false);
                return;
            }
            if (state.mode === 'pomodoro' && state.settings.requireTaskForSession && !state.sessionInProgress) {
                const active = state.tasks.find((t)=>t.id === state.activeTaskId);
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$tasks$2f$task$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSelectable"])(active)) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$browserNotification$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dispatchNoTaskEvent"])();
                    set({
                        noTaskWarning: true
                    });
                    return;
                }
            }
            const patch = {
                sessionInProgress: true
            };
            if (!state.sessionStartedAt) patch.sessionStartedAt = new Date().toISOString();
            set(patch);
            state.setIsRunning(true);
        // setIsRunning already broadcasts on the transition — no extra push needed.
        },
        resetTimer: ()=>{
            const state = get();
            const durations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["durationsFor"])(state.settings);
            set({
                timeLeft: durations[state.mode],
                isRunning: false,
                sessionInProgress: false,
                sessionStartedAt: null
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playUiSound"])('reset');
            broadcastTimer(get());
        },
        completeSession: ()=>{
            const state = get();
            const { mode, activeTaskId, tasks, settings } = state;
            // 1. Audio feedback
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playUiSound"])(mode === 'pomodoro' ? 'sessionComplete' : 'notify');
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$services$2f$browserNotification$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifySessionEnd"])(mode, settings.notificationsEnabled);
            const activeTask = tasks.find((t)=>t.id === activeTaskId);
            const nowIso = new Date().toISOString();
            const startedAt = state.sessionStartedAt ?? nowIso;
            const durationSeconds = Math.max(1, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["minutesFor"])(mode, settings) * 60);
            // 2. Session history item
            const newSessionHistory = recordSessionHistoryItem(state.sessionHistory, activeTaskId, activeTask?.title ?? null, mode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["minutesFor"])(mode, settings), nowIso);
            if (mode === 'pomodoro') {
                const newCount = state.sessionCount + 1;
                // 3. Update task's completed pomodoro count locally + sync to cloud
                const updatedTasks = syncTaskCompletionToCloud(tasks, activeTaskId, nowIso);
                // 4. Cycle bookkeeping (every 4 focus sessions)
                const { cycleId, nextCycleId } = handleCycleBookkeeping(state.currentCycleId, newCount, startedAt, nowIso);
                // 5. Record session row to Supabase
                syncSessionRowToCloud(activeTaskId, cycleId, mode, durationSeconds, startedAt, nowIso);
                // 6. Update local stats
                const { dailyHistory, streak } = updateLocalStats(state.dailyHistory, settings.pomodoroDuration);
                // 7. Create and sync notification
                const notif = createAndSyncNotification((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$notifications$2f$notification$2e$factory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sessionCompleteNotif"])(activeTask?.title ?? null));
                // 8. Determine next mode and time
                const nextMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nextBreakMode"])(newCount);
                const nextTime = nextMode === 'longBreak' ? settings.longBreakDuration * 60 : settings.shortBreakDuration * 60;
                const nextCompleted = activeTask ? activeTask.completedPomodoros + 1 : 0;
                // 9. Apply all state updates
                set({
                    sessionCount: newCount,
                    totalSessions: state.totalSessions + 1,
                    tasks: updatedTasks,
                    dailyHistory,
                    sessionHistory: newSessionHistory,
                    streak,
                    notifications: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$notifications$2f$notification$2e$factory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushNotification"])(state.notifications, notif),
                    isRunning: false,
                    sessionInProgress: false,
                    sessionStartedAt: null,
                    currentCycleId: nextCycleId,
                    mode: settings.autoStartBreaks ? nextMode : 'pomodoro',
                    timeLeft: settings.autoStartBreaks ? nextTime : settings.pomodoroDuration * 60,
                    completionModal: {
                        show: true,
                        taskTitle: activeTask?.title ?? null,
                        taskId: activeTaskId,
                        duration: settings.pomodoroDuration,
                        nextMode,
                        taskCompleted: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$tasks$2f$task$2e$rules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldAutoComplete"])(activeTask, nextCompleted)
                    }
                });
            } else {
                // Break session: record in Supabase (no cycle binding)
                syncSessionRowToCloud(null, null, mode, durationSeconds, startedAt, nowIso);
                const notif = createAndSyncNotification((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$notifications$2f$notification$2e$factory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["breakCompleteNotif"])());
                set({
                    mode: 'pomodoro',
                    timeLeft: settings.pomodoroDuration * 60,
                    isRunning: settings.autoStartSessions,
                    sessionInProgress: settings.autoStartSessions,
                    sessionStartedAt: settings.autoStartSessions ? nowIso : null,
                    sessionHistory: newSessionHistory,
                    notifications: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$notifications$2f$notification$2e$factory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushNotification"])(state.notifications, notif)
                });
            }
            broadcastTimer(get());
        }
    });
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/stores/rootStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRootStore",
    ()=>useRootStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/domain/pomodoro/timer.types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$slices$2f$settingsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/stores/slices/settingsSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$slices$2f$tasksSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/stores/slices/tasksSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$slices$2f$statsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/app/stores/slices/statsSlice.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$slices$2f$notificationsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/stores/slices/notificationsSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$slices$2f$uiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/stores/slices/uiSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$slices$2f$timerSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/stores/slices/timerSlice.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
const useRootStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((...a)=>({
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$slices$2f$settingsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSettingsSlice"])(...a),
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$slices$2f$tasksSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTasksSlice"])(...a),
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$slices$2f$statsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createStatsSlice"])(...a),
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$slices$2f$notificationsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createNotificationsSlice"])(...a),
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$slices$2f$uiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createUISlice"])(...a),
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$slices$2f$timerSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTimerSlice"])(...a)
    }), {
    name: 'focusflow-storage',
    version: 3,
    migrate: (persisted)=>{
        const p = persisted ?? {};
        return {
            ...p,
            settings: {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SETTINGS"],
                ...p.settings ?? {}
            },
            sessionInProgress: false,
            isRunning: false
        };
    },
    partialize: (state)=>({
            tasks: state.tasks,
            settings: state.settings,
            totalSessions: state.totalSessions,
            sessionCount: state.sessionCount,
            sessionInProgress: state.sessionInProgress,
            mode: state.mode,
            timeLeft: state.timeLeft,
            activeTaskId: state.activeTaskId,
            dailyHistory: state.dailyHistory,
            sessionHistory: state.sessionHistory,
            notifications: state.notifications,
            streak: state.streak,
            dailyGoal: state.dailyGoal,
            weeklyGoal: state.weeklyGoal,
            monthlyGoal: state.monthlyGoal,
            soundVolume: state.soundVolume,
            activeSounds: state.activeSounds,
            userName: state.userName,
            sessionStartedAt: state.sessionStartedAt,
            currentCycleId: state.currentCycleId
        }),
    merge: (persisted, current)=>{
        const p = persisted ?? {};
        const settings = {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$domain$2f$pomodoro$2f$timer$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SETTINGS"],
            ...current.settings,
            ...p.settings ?? {}
        };
        return {
            ...current,
            ...p,
            settings,
            dailyGoal: settings.dailyGoal,
            isRunning: false
        };
    }
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/stores/rootStore.ts [app-client] (ecmascript) <export useRootStore as useStore>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStore",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRootStore"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/stores/rootStore.ts [app-client] (ecmascript)");
}),
"[project]/src/app/components/BackgroundSounds.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BackgroundSounds",
    ()=>BackgroundSounds
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-client] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-x.js [app-client] (ecmascript) <export default as VolumeX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume1$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-1.js [app-client] (ecmascript) <export default as Volume1>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$rain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudRain$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cloud-rain.js [app-client] (ecmascript) <export default as CloudRain>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trees$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trees$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trees.js [app-client] (ecmascript) <export default as Trees>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/coffee.js [app-client] (ecmascript) <export default as Coffee>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wind$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wind.js [app-client] (ecmascript) <export default as Wind>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$waves$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Waves$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/waves.js [app-client] (ecmascript) <export default as Waves>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/music.js [app-client] (ecmascript) <export default as Music>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bird$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bird$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bird.js [app-client] (ecmascript) <export default as Bird>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tram$2d$front$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Train$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tram-front.js [app-client] (ecmascript) <export default as Train>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/ui/scroll-area.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/ui/slider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useRootStore__as__useStore$3e$__ = __turbopack_context__.i("[project]/src/app/stores/rootStore.ts [app-client] (ecmascript) <export useRootStore as useStore>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/sounds.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
const SOUNDS = [
    {
        id: "rain",
        label: "Rain",
        description: "Gentle rainfall",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$rain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudRain$3e$__["CloudRain"]
    },
    {
        id: "forest",
        label: "Forest",
        description: "Birds & rustling leaves",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trees$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trees$3e$__["Trees"]
    },
    {
        id: "coffee",
        label: "Coffee Shop",
        description: "Warm café murmur",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__["Coffee"]
    },
    {
        id: "noise",
        label: "White Noise",
        description: "Broadband focus masking",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wind$3e$__["Wind"]
    },
    {
        id: "ocean",
        label: "Ocean Waves",
        description: "Rolling waves, deeply calm",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$waves$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Waves$3e$__["Waves"]
    },
    {
        id: "fire",
        label: "Fireplace",
        description: "Crackling warmth",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"]
    },
    {
        id: "birds",
        label: "Birdsong",
        description: "Morning chirps",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bird$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bird$3e$__["Bird"]
    },
    {
        id: "pink",
        label: "Pink Noise",
        description: "Balanced deep masking",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__["Music"]
    },
    {
        id: "train",
        label: "Train Ride",
        description: "Rhythmic carriage hum",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tram$2d$front$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Train$3e$__["Train"]
    },
    {
        id: "brown",
        label: "Brown Noise",
        description: "Deep low-frequency rumble",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wind$3e$__["Wind"]
    }
];
// ---------- Noise buffer generators ----------
function whiteBuffer(ctx, seconds = 4) {
    const len = ctx.sampleRate * seconds;
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for(let c = 0; c < 2; c++){
        const d = buf.getChannelData(c);
        for(let i = 0; i < len; i++)d[i] = Math.random() * 2 - 1;
    }
    return buf;
}
function pinkBuffer(ctx, seconds = 4) {
    const len = ctx.sampleRate * seconds;
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for(let c = 0; c < 2; c++){
        const d = buf.getChannelData(c);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for(let i = 0; i < len; i++){
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
function brownBuffer(ctx, seconds = 4) {
    const len = ctx.sampleRate * seconds;
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for(let c = 0; c < 2; c++){
        const d = buf.getChannelData(c);
        let last = 0;
        for(let i = 0; i < len; i++){
            const w = Math.random() * 2 - 1;
            last = (last + 0.02 * w) / 1.02;
            d[i] = last * 3.5;
        }
    }
    return buf;
}
function makeNoiseSource(ctx, buf) {
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    src.start();
    return src;
}
// Short event tone — droplet, chirp, clink, crackle, etc.
function playEvent(ctx, dest, opts) {
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
function playNoisePop(ctx, dest, buf, duration, gainVal, freq) {
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
const FACTORIES = {
    // Rain: filtered pink noise with subtle high-frequency shimmer + occasional droplets
    rain: (ctx, white, pink)=>{
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
        const scheduled = [];
        const dropletDest = master;
        const scheduleDroplet = ()=>{
            const next = 200 + Math.random() * 600;
            const id = window.setTimeout(()=>{
                playEvent(ctx, dropletDest, {
                    freq: 1800 + Math.random() * 1400,
                    freqEnd: 800,
                    duration: 0.06 + Math.random() * 0.05,
                    gain: 0.04 + Math.random() * 0.05,
                    type: "sine"
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
            cleanup: ()=>{
                try {
                    src.stop();
                } catch  {}
                try {
                    src2.stop();
                } catch  {}
            }
        };
    },
    // Forest: soft wind through trees + intermittent chirps
    forest: (ctx, _w, pink)=>{
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
        const scheduled = [];
        const scheduleChirp = ()=>{
            const next = 1500 + Math.random() * 4000;
            const id = window.setTimeout(()=>{
                const base = 2400 + Math.random() * 1800;
                const count = 1 + Math.floor(Math.random() * 3);
                for(let i = 0; i < count; i++){
                    window.setTimeout(()=>{
                        playEvent(ctx, master, {
                            freq: base,
                            freqEnd: base * 1.4,
                            duration: 0.09,
                            gain: 0.06,
                            type: "sine"
                        });
                    }, i * 110);
                }
                scheduleChirp();
            }, next);
            scheduled.push(id);
        };
        scheduleChirp();
        return {
            master,
            baseGain,
            scheduled,
            cleanup: ()=>{
                try {
                    src.stop();
                } catch  {}
                try {
                    lfo.stop();
                } catch  {}
            }
        };
    },
    // Coffee shop: low murmur + occasional cup clinks
    coffee: (ctx, white, _p, brown)=>{
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
        const scheduled = [];
        const scheduleClink = ()=>{
            const next = 3000 + Math.random() * 6000;
            const id = window.setTimeout(()=>{
                playNoisePop(ctx, master, white, 0.18, 0.06, 3500 + Math.random() * 1500);
                scheduleClink();
            }, next);
            scheduled.push(id);
        };
        scheduleClink();
        return {
            master,
            baseGain,
            scheduled,
            cleanup: ()=>{
                try {
                    src.stop();
                } catch  {}
                try {
                    lfo.stop();
                } catch  {}
            }
        };
    },
    // White noise
    noise: (ctx, white)=>{
        const master = ctx.createGain();
        const baseGain = 0.35;
        master.gain.value = baseGain;
        master.connect(ctx.destination);
        const src = makeNoiseSource(ctx, white);
        src.connect(master);
        return {
            master,
            baseGain,
            scheduled: [],
            cleanup: ()=>{
                try {
                    src.stop();
                } catch  {}
            }
        };
    },
    // Ocean: deep noise with slow swell LFO and lowpass
    ocean: (ctx, _w, pink)=>{
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
            master,
            baseGain,
            scheduled: [],
            cleanup: ()=>{
                try {
                    src.stop();
                } catch  {}
                try {
                    lfo.stop();
                } catch  {}
            }
        };
    },
    // Fireplace: brown noise hum + random crackle pops
    fire: (ctx, white, _p, brown)=>{
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
        const scheduled = [];
        const scheduleCrackle = ()=>{
            const next = 80 + Math.random() * 500;
            const id = window.setTimeout(()=>{
                const pops = 1 + Math.floor(Math.random() * 3);
                for(let i = 0; i < pops; i++){
                    window.setTimeout(()=>{
                        playNoisePop(ctx, master, white, 0.04 + Math.random() * 0.06, 0.08 + Math.random() * 0.12, 1200 + Math.random() * 2400);
                    }, i * 30);
                }
                scheduleCrackle();
            }, next);
            scheduled.push(id);
        };
        scheduleCrackle();
        return {
            master,
            baseGain,
            scheduled,
            cleanup: ()=>{
                try {
                    src.stop();
                } catch  {}
            }
        };
    },
    // Birdsong: faint air + frequent melodic chirps
    birds: (ctx, _w, pink)=>{
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
        const scheduled = [];
        const scheduleChirp = ()=>{
            const next = 400 + Math.random() * 1400;
            const id = window.setTimeout(()=>{
                const base = 2200 + Math.random() * 2200;
                const count = 2 + Math.floor(Math.random() * 4);
                for(let i = 0; i < count; i++){
                    window.setTimeout(()=>{
                        const dir = Math.random() > 0.5 ? 1.5 : 0.7;
                        playEvent(ctx, master, {
                            freq: base * (0.9 + Math.random() * 0.3),
                            freqEnd: base * dir,
                            duration: 0.08 + Math.random() * 0.07,
                            gain: 0.09,
                            type: "sine"
                        });
                    }, i * (90 + Math.random() * 60));
                }
                scheduleChirp();
            }, next);
            scheduled.push(id);
        };
        scheduleChirp();
        return {
            master,
            baseGain,
            scheduled,
            cleanup: ()=>{
                try {
                    src.stop();
                } catch  {}
            }
        };
    },
    // Pink noise
    pink: (ctx, _w, pink)=>{
        const master = ctx.createGain();
        const baseGain = 0.4;
        master.gain.value = baseGain;
        master.connect(ctx.destination);
        const src = makeNoiseSource(ctx, pink);
        src.connect(master);
        return {
            master,
            baseGain,
            scheduled: [],
            cleanup: ()=>{
                try {
                    src.stop();
                } catch  {}
            }
        };
    },
    // Train: rumble + rhythmic clack-clack
    train: (ctx, white, _p, brown)=>{
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
        const scheduled = [];
        let i = 0;
        const tick = ()=>{
            // double clack pattern
            const interval = 520;
            const id = window.setTimeout(()=>{
                playNoisePop(ctx, master, white, 0.06, 0.14, 180);
                window.setTimeout(()=>{
                    playNoisePop(ctx, master, white, 0.06, 0.12, 220);
                }, 130);
                i++;
                tick();
            }, interval);
            scheduled.push(id);
        };
        tick();
        return {
            master,
            baseGain,
            scheduled,
            cleanup: ()=>{
                try {
                    src.stop();
                } catch  {}
            }
        };
    },
    // Brown noise
    brown: (ctx, _w, _p, brown)=>{
        const master = ctx.createGain();
        const baseGain = 0.5;
        master.gain.value = baseGain;
        master.connect(ctx.destination);
        const src = makeNoiseSource(ctx, brown);
        src.connect(master);
        return {
            master,
            baseGain,
            scheduled: [],
            cleanup: ()=>{
                try {
                    src.stop();
                } catch  {}
            }
        };
    }
};
function BackgroundSounds() {
    _s();
    const { activeSounds, soundVolume, toggleSound, setSoundVolume } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useRootStore__as__useStore$3e$__["useStore"])();
    const audioCtxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const whiteRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pinkRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const brownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const instancesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const prevVolumeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(soundVolume > 0 ? soundVolume : 0.5);
    const getCtx = ()=>{
        if (!audioCtxRef.current) {
            audioCtxRef.current = new AudioContext();
            whiteRef.current = whiteBuffer(audioCtxRef.current);
            pinkRef.current = pinkBuffer(audioCtxRef.current);
            brownRef.current = brownBuffer(audioCtxRef.current);
        }
        return audioCtxRef.current;
    };
    const startSound = (id)=>{
        const ctx = getCtx();
        if (ctx.state === "suspended") ctx.resume();
        if (instancesRef.current.has(id)) return;
        const factory = FACTORIES[id];
        if (!factory) return;
        const inst = factory(ctx, whiteRef.current, pinkRef.current, brownRef.current);
        inst.master.gain.value = soundVolume * inst.baseGain;
        instancesRef.current.set(id, inst);
    };
    const stopSound = (id)=>{
        const inst = instancesRef.current.get(id);
        if (!inst) return;
        inst.scheduled.forEach((t)=>clearTimeout(t));
        inst.cleanup();
        try {
            inst.master.disconnect();
        } catch  {}
        instancesRef.current.delete(id);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BackgroundSounds.useEffect": ()=>{
            instancesRef.current.forEach({
                "BackgroundSounds.useEffect": (_, id)=>{
                    if (!activeSounds.includes(id)) stopSound(id);
                }
            }["BackgroundSounds.useEffect"]);
            activeSounds.forEach({
                "BackgroundSounds.useEffect": (id)=>{
                    if (!instancesRef.current.has(id)) startSound(id);
                }
            }["BackgroundSounds.useEffect"]);
        }
    }["BackgroundSounds.useEffect"], [
        activeSounds
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BackgroundSounds.useEffect": ()=>{
            instancesRef.current.forEach({
                "BackgroundSounds.useEffect": (inst)=>{
                    inst.master.gain.value = soundVolume * inst.baseGain;
                }
            }["BackgroundSounds.useEffect"]);
        }
    }["BackgroundSounds.useEffect"], [
        soundVolume
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BackgroundSounds.useEffect": ()=>{
            if (soundVolume > 0) prevVolumeRef.current = soundVolume;
        }
    }["BackgroundSounds.useEffect"], [
        soundVolume
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BackgroundSounds.useEffect": ()=>({
                "BackgroundSounds.useEffect": ()=>{
                    instancesRef.current.forEach({
                        "BackgroundSounds.useEffect": (_, id)=>stopSound(id)
                    }["BackgroundSounds.useEffect"]);
                    audioCtxRef.current?.close();
                }
            })["BackgroundSounds.useEffect"]
    }["BackgroundSounds.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full flex-col gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                    className: "h-3.5 w-3.5 text-primary"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                                    lineNumber: 596,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                                lineNumber: 595,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-foreground",
                                style: {
                                    fontWeight: 600,
                                    fontSize: "0.9375rem"
                                },
                                children: "Ambient Sounds"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                                lineNumber: 598,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                        lineNumber: 594,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted-foreground",
                        style: {
                            fontSize: "0.72rem"
                        },
                        children: [
                            activeSounds.length,
                            "/",
                            SOUNDS.length,
                            " active"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                        lineNumber: 602,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                lineNumber: 593,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                className: "h-[6.25rem] -mr-1 pr-1.5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-2",
                    children: SOUNDS.map((sound)=>{
                        const isActive = activeSounds.includes(sound.id);
                        const Icon = sound.icon;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].button, {
                            whileTap: {
                                scale: 0.97
                            },
                            whileHover: {
                                y: -2,
                                scale: 1.02
                            },
                            transition: {
                                type: "spring",
                                stiffness: 320,
                                damping: 22
                            },
                            onClick: ()=>toggleSound(sound.id),
                            className: `flex cursor-pointer items-center gap-2 rounded-lg border p-2 text-left transition-all ${isActive ? "border-primary/35 bg-primary/6 shadow-sm" : "border-border bg-card hover:bg-secondary/50"}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors ${isActive ? "bg-primary/15" : "bg-secondary"}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        className: `h-3.5 w-3.5 ${isActive ? "text-primary" : "text-muted-foreground"}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                                        lineNumber: 629,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                                    lineNumber: 626,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `truncate leading-tight ${isActive ? "text-foreground" : "text-muted-foreground"}`,
                                            style: {
                                                fontSize: "0.8rem",
                                                fontWeight: 500
                                            },
                                            children: sound.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                                            lineNumber: 634,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "truncate text-muted-foreground leading-tight",
                                            style: {
                                                fontSize: "0.65rem"
                                            },
                                            children: isActive ? "▶ Playing" : sound.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                                            lineNumber: 640,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                                    lineNumber: 633,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, sound.id, true, {
                            fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                            lineNumber: 614,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                    lineNumber: 609,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                lineNumber: 608,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-auto rounded-xl border border-border bg-secondary/40 px-4 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setSoundVolume(soundVolume === 0 ? prevVolumeRef.current : 0);
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playUiSound"])("toggle");
                                },
                                className: "shrink-0 cursor-pointer text-muted-foreground hover:text-foreground transition-colors",
                                "aria-label": soundVolume === 0 ? "Unmute" : "Mute",
                                title: soundVolume === 0 ? "Unmute" : "Mute",
                                children: soundVolume === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__["VolumeX"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                                    lineNumber: 666,
                                    columnNumber: 15
                                }, this) : soundVolume < 0.5 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume1$3e$__["Volume1"], {
                                    className: "h-4 w-4 text-primary"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                                    lineNumber: 668,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                    className: "h-4 w-4 text-primary"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                                    lineNumber: 670,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                                lineNumber: 656,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 relative group",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                    min: 0,
                                    max: 1,
                                    step: 0.05,
                                    value: [
                                        soundVolume
                                    ],
                                    onValueChange: ([v])=>{
                                        setSoundVolume(v);
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$sounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playVolumeTick"])(v);
                                    },
                                    className: "flex-1"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                                    lineNumber: 674,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                                lineNumber: 673,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-9 text-right tabular-nums",
                                style: {
                                    fontFamily: "var(--font-jetbrains-mono), monospace",
                                    fontSize: "0.75rem",
                                    color: "var(--color-foreground)",
                                    fontWeight: 500
                                },
                                children: [
                                    Math.round(soundVolume * 100),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                                lineNumber: 686,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                        lineNumber: 655,
                        columnNumber: 9
                    }, this),
                    activeSounds.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-muted-foreground",
                        style: {
                            fontSize: "0.7rem"
                        },
                        children: "Select a sound above to start playing"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                        lineNumber: 700,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-primary/70",
                        style: {
                            fontSize: "0.7rem"
                        },
                        children: "Now playing · selecting another sound will switch the playback"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                        lineNumber: 704,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/BackgroundSounds.tsx",
                lineNumber: 654,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/BackgroundSounds.tsx",
        lineNumber: 592,
        columnNumber: 5
    }, this);
}
_s(BackgroundSounds, "+V9luw/ZB5xMmcqEsgd6EBPaqoE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$stores$2f$rootStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useRootStore__as__useStore$3e$__["useStore"]
    ];
});
_c = BackgroundSounds;
var _c;
__turbopack_context__.k.register(_c, "BackgroundSounds");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1kk9xsa._.js.map