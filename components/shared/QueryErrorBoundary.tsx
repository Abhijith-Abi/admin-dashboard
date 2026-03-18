"use client";

import * as React from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

interface QueryErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends React.Component<
    QueryErrorBoundaryProps & { onReset: () => void },
    ErrorBoundaryState
> {
    constructor(props: QueryErrorBoundaryProps & { onReset: () => void }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 text-center border rounded-3xl bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50 flex flex-col items-center gap-4 animate-in fade-in duration-300">
                    <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400 font-bold text-xl">
                        !
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">Data Fetching Error</h3>
                        <p className="text-sm text-red-600 dark:text-red-400 max-w-sm">
                            {this.state.error?.message || "An unexpected error occurred."}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            this.props.onReset();
                            this.setState({ hasError: false, error: null });
                        }}
                        className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-900/60 text-red-700 dark:text-red-300 rounded-xl text-sm font-medium transition-colors"
                    >
                        Try again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export function QueryErrorBoundary({ children }: QueryErrorBoundaryProps) {
    const { reset } = useQueryErrorResetBoundary();
    return <ErrorBoundary onReset={reset}>{children}</ErrorBoundary>;
}
