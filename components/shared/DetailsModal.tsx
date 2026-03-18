"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface DetailsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: React.ReactNode;
    description?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    titleClassName?: string;
}

export function DetailsModal({
    open,
    onOpenChange,
    title,
    description,
    children,
    className,
    titleClassName,
}: DetailsModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent 
                className={cn(
                    "w-[95vw] max-w-md max-h-[90vh] bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl rounded-3xl overflow-hidden outline-none p-0 gap-0 flex flex-col",
                    className
                )}
            >
                <DialogHeader className="p-6 pb-4 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md z-10 shrink-0">
                    <DialogTitle className={cn("text-2xl font-bold", titleClassName)}>
                        {title}
                    </DialogTitle>
                    {description && (
                        <DialogDescription className="text-zinc-500 dark:text-zinc-400 mt-1">
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}
