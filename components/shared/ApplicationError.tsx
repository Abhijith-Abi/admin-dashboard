"use client";

import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ApplicationError({
    error,
    reset,
}: {
    error?: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 w-full h-full">
            <div className="flex flex-col items-center justify-center p-10 text-center rounded-[2.5rem] border border-red-200 dark:border-red-900/50 bg-white/60 dark:bg-zinc-900/60 shadow-2xl shadow-red-500/10 dark:shadow-red-900/20 backdrop-blur-2xl transition-all duration-300 animate-in zoom-in-95 max-w-xl w-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-red-500 to-orange-500"></div>

                <div className="h-24 w-24 bg-red-50 dark:bg-red-500/10 rounded-[2rem] flex items-center justify-center mb-8 border border-red-100 dark:border-red-500/20 shadow-inner relative z-10 rotate-3 transition-transform hover:rotate-0 duration-300">
                    <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-500" />
                </div>

                <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">
                    Application Error
                </h2>

                <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-[85%] leading-relaxed text-lg">
                    Looks like we encountered an unexpected problem. Don't
                    worry, it's not your fault. Let's get you back on track.
                </p>

                {process.env.NODE_ENV === "development" && error && (
                    <div className="mb-10 w-full max-w-md mx-auto">
                        <div className="p-5 bg-red-50/50 dark:bg-red-950/30 rounded-2xl text-left border border-red-100/50 dark:border-red-900/30 overflow-auto max-h-40 shadow-inner custom-scrollbar relative">
                            <div className="absolute top-0 right-0 p-2 opacity-50 text-[10px] font-bold uppercase tracking-widest text-red-800 dark:text-red-300">
                                Dev Only
                            </div>
                            <code className="text-xs text-red-600 dark:text-red-400 wrap-break-word font-mono block mt-2 whitespace-pre-wrap">
                                {error.message || "Unknown error occurred"}
                            </code>
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm mx-auto">
                    <Button
                        onClick={() => reset()}
                        className="flex-1 rounded-2xl h-14 bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 font-semibold text-base group"
                    >
                        <RefreshCcw className="mr-2 h-5 w-5 transition-transform group-hover:-rotate-180 duration-500" />
                        Try Again
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1 rounded-2xl h-14 border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 shadow-sm hover:shadow-md transition-all duration-300 font-semibold text-base text-zinc-700 dark:text-zinc-300"
                        onClick={() => (window.location.href = "/dashboard")}
                    >
                        <Home className="mr-2 h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
}
