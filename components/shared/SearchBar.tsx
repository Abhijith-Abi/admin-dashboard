"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchBarProps {
    activeTab: "users" | "products";
    onSearch: (value: string) => void;
}

export function SearchBar({ activeTab, onSearch }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = React.useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 400);
    const searchInputRef = React.useRef<HTMLInputElement>(null);

    // Trigger parent callback only when debounced value changes
    React.useEffect(() => {
        onSearch(debouncedSearchTerm);
    }, [debouncedSearchTerm, onSearch]);

    // Clear search term when tab changes
    React.useEffect(() => {
        setSearchTerm("");
    }, [activeTab]);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="relative group w-full md:w-80 lg:w-96 mb-2 md:mb-0">
            <div className="relative flex items-center z-10 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/50 rounded-2xl shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:border-emerald-500/50 group-hover:bg-white/80 dark:group-hover:bg-zinc-900/80">
                <Search className="absolute left-4 h-5 w-5 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                <Input
                    ref={searchInputRef}
                    id={`search-${activeTab}`}
                    aria-label={`Search ${activeTab}`}
                    type="text"
                    placeholder={`Search ${activeTab} by name...`}
                    className="pl-12 pr-[80px] h-12 w-full bg-transparent border-none focus-visible:ring-0 shadow-none text-base transition-colors duration-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                    <button
                        onClick={() => {
                            setSearchTerm("");
                            searchInputRef.current?.focus();
                        }}
                        className="absolute right-12 p-1.5 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        aria-label="Clear search"
                    >
                        <X className="h-4 w-4 cursor-pointer" />
                    </button>
                )}
                <div className="absolute right-3 flex items-center">
                    <kbd className="pointer-events-none hidden sm:inline-flex h-[24px] select-none items-center gap-1 rounded bg-zinc-100 dark:bg-zinc-800 px-2 font-mono text-[10px] font-medium text-zinc-500 dark:text-zinc-400 opacity-100 border border-zinc-200 dark:border-zinc-700 transition-colors duration-300">
                        <span className="text-[10px]">⌘</span>K
                    </kbd>
                </div>
            </div>
        </div>
    );
}
