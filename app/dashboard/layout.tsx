import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LayoutDashboard } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans selection:bg-indigo-500/30">
            {/* Ambient glowing background orbs */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-linear-to-br from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl opacity-50 dark:opacity-20 transform translate-x-1/3 -translate-y-1/4 mix-blend-multiply dark:mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-linear-to-tr from-sky-500/10 via-emerald-500/5 to-transparent rounded-full blur-3xl opacity-50 dark:opacity-20 transform -translate-x-1/3 translate-y-1/4 mix-blend-multiply dark:mix-blend-screen" />
            </div>
            {/* Floating Glassmorphic Header */}
            <div className="sticky top-0 z-30 pt-6 px-4 sm:px-6 lg:px-8">
                <header className="mx-auto max-w-7xl flex h-16 items-center gap-x-4 rounded-2xl border border-white/60 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 shadow-lg shadow-zinc-200/40 dark:shadow-black/40 backdrop-blur-xl px-6 transition-all duration-300">
                    <div className="flex flex-1 items-center gap-x-4 self-stretch lg:gap-x-6">
                        <div className="flex items-center gap-3 font-bold tracking-tight text-lg">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-md text-white">
                                <LayoutDashboard className="h-5 w-5" />
                            </div>
                            <span className="bg-linear-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
                                Admin
                            </span>
                        </div>
                        <div className="flex flex-1"></div>
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            <ThemeToggle />
                        </div>
                    </div>
                </header>
            </div>

            {/* Main content */}
            <main className="flex-1 relative z-10 mt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
