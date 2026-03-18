"use client";

import { useEffect } from "react";
import { SystemFailure } from "@/components/shared/SystemFailure";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Fatal System Error:", error);
    }, [error]);

    return (
        <html lang="en">
            <body className="antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-amber-100 dark:selection:bg-amber-900/30">
                <SystemFailure reset={reset} />
            </body>
        </html>
    );
}
