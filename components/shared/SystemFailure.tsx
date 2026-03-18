"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";

export function SystemFailure({ reset }: { reset: () => void }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-50/50 via-zinc-50 to-zinc-50 dark:from-amber-950/20 dark:via-zinc-950 dark:to-zinc-950">
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-[3rem] border border-amber-200/50 dark:border-amber-900/20 bg-white/80 dark:bg-zinc-900/80 shadow-2xl shadow-amber-500/5 backdrop-blur-3xl max-w-xl w-full relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-amber-500/10 dark:bg-amber-500/5 blur-[100px] pointer-events-none"></div>

                <div className="h-28 w-28 bg-linear-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-900/10 rounded-[2.5rem] flex items-center justify-center mb-8 border border-amber-200/50 dark:border-amber-500/20 shadow-inner relative z-10 rotate-3">
                    <AlertTriangle className="h-14 w-14 text-amber-600 dark:text-amber-500 drop-shadow-sm" />
                </div>

                <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 mb-5 tracking-tight">
                    System Failure
                </h1>

                <p className="text-zinc-600 dark:text-zinc-400 mb-10 max-w-[90%] leading-relaxed text-lg font-medium">
                    We encountered a critical problem that prevented the
                    application from loading. Please try restarting the
                    session.
                </p>

                <button
                    onClick={() => reset()}
                    className="group relative flex h-16 w-full max-w-sm items-center justify-center gap-3 overflow-hidden rounded-2xl bg-zinc-900 px-8 text-base font-bold text-zinc-50 shadow-xl transition-all duration-300 hover:bg-zinc-800 hover:-translate-y-1 hover:shadow-2xl dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 active:translate-y-0 active:shadow-md"
                >
                    <RefreshCcw className="h-5 w-5 transition-transform group-hover:rotate-180 duration-700" />
                    <span>Restart Application</span>
                </button>

                <div className="mt-12 opacity-40">
                    <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                        Error Code: 500_FATAL_UI_CRASH
                    </p>
                </div>
            </div>
        </div>
    );
}
