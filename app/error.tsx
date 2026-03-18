"use client";

import { useEffect } from "react";
import { ApplicationError } from "@/components/shared/ApplicationError";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Runtime Exception:", error);
    }, [error]);

    return <ApplicationError error={error} reset={reset} />;
}
