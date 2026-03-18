import Link from "next/link";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-center items-center overflow-hidden font-sans selection:bg-emerald-500/30 p-6">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-linear-to-br from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl opacity-50 dark:opacity-20 transform translate-x-1/3 -translate-y-1/4 mix-blend-multiply dark:mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-linear-to-tr from-sky-500/10 via-emerald-500/5 to-transparent rounded-full blur-3xl opacity-50 dark:opacity-20 transform -translate-x-1/3 translate-y-1/4 mix-blend-multiply dark:mix-blend-screen" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-sm w-full">
                <div className="mb-10 relative">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full scale-[2] animate-pulse"></div>
                    <div className="h-28 w-28 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl border border-zinc-200 dark:border-zinc-800/50 shadow-2xl flex items-center justify-center relative transition-transform hover:scale-105 duration-500 cursor-default">
                        <AlertTriangle className="w-12 h-12 text-emerald-500 dark:text-emerald-400 drop-shadow-md" />
                    </div>
                </div>

                <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent mb-4">
                    404
                </h1>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
                    Page not found
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 mb-10 leading-relaxed text-sm sm:text-base">
                    The page you are looking for doesn't exist or has been
                    moved. Let's get you back on track.
                </p>

                {/* Call to action */}
                <Link href="/dashboard">
                    <Button className="h-12 sm:h-14 px-8 sm:px-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 font-medium flex items-center gap-3 text-base">
                        <Home className="w-5 h-5" />
                        Back to Dashboard
                    </Button>
                </Link>
            </div>

            <div className="absolute bottom-10 opacity-30 dark:opacity-20 flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-400"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-400"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-400"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-400"></div>
            </div>
        </div>
    );
}
