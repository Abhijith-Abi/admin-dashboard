"use client";

import * as React from "react";
import { Users, Package, List, LayoutGrid } from "lucide-react";

import { useStore } from "@/store";
import dynamic from "next/dynamic";
import { QueryErrorBoundary } from "@/components/shared/QueryErrorBoundary";
import { Spinner } from "@/components/ui/spinner";
import { SearchBar } from "@/components/shared/SearchBar";

// Dynamically import heavy components
const UserDetailsModal = dynamic(() => import("@/features/users/components/UserDetailsModal").then(mod => mod.UserDetailsModal), { ssr: false });
const ProductDetailsModal = dynamic(() => import("@/features/products/components/ProductDetailsModal").then(mod => mod.ProductDetailsModal), { ssr: false });
const UserTable = dynamic(() => import("@/features/users/components/UserTable").then(mod => mod.UserTable), {
    ssr: false,
    loading: () => <TableFallback />
});
const ProductTable = dynamic(() => import("@/features/products/components/ProductTable").then(mod => mod.ProductTable), {
    ssr: false,
    loading: () => <TableFallback />
});

function TableFallback() {
    return (
        <div className="flex justify-center items-center h-64 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800/60 rounded-3xl shadow-sm">
            <Spinner size="lg" />
        </div>
    );
}

export default function DashboardPage() {
    const { activeTab, setActiveTab, viewMode, setViewMode } = useStore();
    const [activeSearchQuery, setActiveSearchQuery] = React.useState("");
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Spinner size="xl" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8">
            {/* Header Section */}
            <div className="flex flex-col gap-1 items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-2 shadow-sm transition-colors duration-300">
                    {activeTab === "users" ? (
                        <Users className="w-4 h-4" />
                    ) : (
                        <Package className="w-4 h-4" />
                    )}
                    <span className="capitalize">{activeTab} Management</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent capitalize transition-all duration-300">
                    {activeTab} Directory
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-base mt-2 max-w-xl transition-colors duration-300">
                    View, search, and manage your platform {activeTab}. Click on
                    any row to see detailed information.
                </p>
            </div>

            {/* Controls Section: Tabs, View Toggle, and Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center">
                    {/* Custom Segmented Control for Tabs */}
                    <div className="flex flex-1 sm:flex-none items-center p-1.5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-2xl border border-zinc-200 dark:border-zinc-800/50 shadow-sm relative z-10 w-full sm:w-auto">
                        <button
                            onClick={() => setActiveTab("users")}
                            className={`cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                                activeTab === "users"
                                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50"
                                    : "text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 border border-transparent"
                            }`}
                        >
                            <Users className="w-4 h-4" /> Users
                        </button>
                        <button
                            onClick={() => setActiveTab("products")}
                            className={`cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                                activeTab === "products"
                                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50"
                                    : "text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 border border-transparent"
                            }`}
                        >
                            <Package className="w-4 h-4" /> Products
                        </button>
                    </div>

                    {/* View Mode Toggle (List/Grid) */}
                    <div className="flex items-center p-1.5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-2xl border border-zinc-200 dark:border-zinc-800/50 shadow-sm relative z-10 shrink-0">
                        <button
                            onClick={() => setViewMode("list")}
                            className={`cursor-pointer flex items-center justify-center p-2.5 rounded-xl font-medium transition-all duration-300 ${
                                viewMode === "list"
                                    ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50"
                                    : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 border border-transparent"
                            }`}
                            aria-label="List View"
                        >
                            <List className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`cursor-pointer flex items-center justify-center p-2.5 rounded-xl font-medium transition-all duration-300 ${
                                viewMode === "grid"
                                    ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50"
                                    : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 border border-transparent"
                            }`}
                            aria-label="Grid View"
                        >
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <SearchBar activeTab={activeTab} onSearch={setActiveSearchQuery} />
            </div>

            <div className="transition-all duration-500 ease-in-out relative min-h-[600px]">
                {activeTab === "users" ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <QueryErrorBoundary>
                            <React.Suspense fallback={<TableFallback />}>
                                <UserTable searchQuery={activeSearchQuery} />
                            </React.Suspense>
                        </QueryErrorBoundary>
                        <UserDetailsModal />
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <QueryErrorBoundary>
                            <React.Suspense fallback={<TableFallback />}>
                                <ProductTable searchQuery={activeSearchQuery} />
                            </React.Suspense>
                        </QueryErrorBoundary>
                        <ProductDetailsModal />
                    </div>
                )}
            </div>
        </div>
    );
}
