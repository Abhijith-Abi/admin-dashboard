"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useGetUsers } from "@/features/users/api/useGetUsers";
import { useStore } from "@/store";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { SearchX } from "lucide-react";
import { PaginationControl } from "@/components/shared/PaginationControl";
import { useVirtualizer } from '@tanstack/react-virtual';
import { Spinner } from "@/components/ui/spinner";
import { UserTableRow } from "./UserTableRow";
import { User } from "@/types";

export function UserTable({ searchQuery }: { searchQuery: string }) {
    const { setSelectedUser, viewMode } = useStore();
    const [page, setPage] = React.useState(0);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const limit = 10;

    React.useEffect(() => {
        setPage(0);
    }, [searchQuery]);

    React.useEffect(() => {
        if (page > 0 || viewMode === "grid") {
            const yOffset = -100;
            const element = containerRef.current;
            if (element) {
                const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    }, [page, viewMode]);

    const { data, isFetching } = useGetUsers({
        limit,
        skip: page * limit,
        query: searchQuery,
    });

    const totalPages = data ? Math.ceil(data.total / limit) : 0;

    const handleUserSelect = React.useCallback((user: User) => {
        setSelectedUser(user);
    }, [setSelectedUser]);

    const allUsers = React.useMemo(() => data?.users || [], [data?.users]);

    const parentRef = React.useRef<HTMLDivElement>(null);
    const rowVirtualizer = useVirtualizer({
        count: allUsers.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 73,
        overscan: 5,
    });


    return (
        <div ref={containerRef} className="flex flex-col gap-5">
            {viewMode === "list" ? (
                <div 
                    ref={parentRef}
                    className="overflow-x-auto rounded-3xl border border-zinc-200 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 shadow-xl shadow-zinc-200/50 dark:shadow-black/40 backdrop-blur-2xl transition-all relative min-h-[400px]"
                >
                    {isFetching && allUsers.length > 0 && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/30 dark:bg-zinc-900/30 backdrop-blur-[2px] rounded-3xl">
                            <Spinner size="lg" />
                        </div>
                    )}
                    <table className="w-full caption-bottom text-sm relative">
                        <TableHeader className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm sticky top-0 z-20">
                            <TableRow>
                                <TableHead className="py-4 font-semibold text-zinc-900 dark:text-zinc-50">User</TableHead>
                                <TableHead className="py-4 font-semibold text-zinc-900 dark:text-zinc-50 hidden sm:table-cell">Email</TableHead>
                                <TableHead className="py-4 font-semibold text-zinc-900 dark:text-zinc-50 hidden md:table-cell">Phone</TableHead>
                                <TableHead className="py-4 font-semibold text-zinc-900 dark:text-zinc-50 text-right pr-5">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            className={isFetching ? "opacity-50 transition-opacity duration-300 relative" : "transition-opacity duration-300 relative"}
                        >
                            {allUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-[400px] text-center">
                                        <div className="flex flex-col items-center justify-center text-zinc-500">
                                            <div className="h-16 w-16 bg-white/60 dark:bg-zinc-800/60 rounded-full flex items-center justify-center mb-4 border border-zinc-200 dark:border-zinc-700/50 shadow-sm">
                                                <SearchX className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
                                            </div>
                                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-1">No users found</h3>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
                                                We couldn&apos;t find any users matching <span className="font-semibold text-zinc-700 dark:text-zinc-300">&quot;{searchQuery}&quot;</span>. Try checking for typos.
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <>
                                    {rowVirtualizer.getVirtualItems().length > 0 && (
                                        <TableRow>
                                            <TableCell style={{ height: `${rowVirtualizer.getVirtualItems()[0]?.start || 0}px` }} colSpan={4} className="p-0 border-none m-0 leading-none" />
                                        </TableRow>
                                    )}
                                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                                        const user = allUsers[virtualRow.index];
                                        return (
                                            <UserTableRow 
                                                key={virtualRow.key} 
                                                user={user} 
                                                onClick={handleUserSelect}
                                                ref={rowVirtualizer.measureElement}
                                                data-index={virtualRow.index}
                                            />
                                        );
                                    })}
                                    {rowVirtualizer.getVirtualItems().length > 0 && (
                                        <TableRow>
                                            <TableCell style={{ height: `${rowVirtualizer.getTotalSize() - (rowVirtualizer.getVirtualItems()[rowVirtualizer.getVirtualItems().length - 1]?.end || 0)}px` }} colSpan={4} className="p-0 border-none m-0 leading-none" />
                                        </TableRow>
                                    )}
                                </>
                            )}
                        </TableBody>
                    </table>
                </div>
            ) : allUsers.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-16 text-center text-zinc-500 rounded-3xl border border-zinc-200 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 shadow-xl shadow-zinc-200/50 dark:shadow-black/40 backdrop-blur-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
                    <div className="h-20 w-20 bg-white/60 dark:bg-zinc-800/60 rounded-full flex items-center justify-center mb-5 border border-zinc-200 dark:border-zinc-700/50 shadow-sm">
                        <SearchX className="h-10 w-10 text-zinc-400 dark:text-zinc-500" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">No users found</h3>
                    <p className="max-w-md mx-auto text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        We couldn&apos;t find any users matching <span className="font-semibold text-zinc-700 dark:text-zinc-300">&quot;{searchQuery}&quot;</span>. Try checking for typos or using different keywords.
                    </p>
                </div>
            ) : (
                <div className="relative pt-2">
                    {isFetching && allUsers.length > 0 && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/30 dark:bg-zinc-900/30 backdrop-blur-[2px] rounded-3xl">
                            <Spinner size="lg" />
                        </div>
                    )}
                    <div className={cn(
                        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-300",
                        isFetching ? "opacity-50" : "opacity-100"
                    )}>
                        {allUsers.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800/60 rounded-3xl p-6 hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden flex flex-col items-center text-center gap-4 animate-in zoom-in-95"
                            onClick={() => handleUserSelect(user)}
                        >
                            <Image
                                src={user.image}
                                alt={`${user.firstName} ${user.lastName}`}
                                width={80}
                                height={80}
                                className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 shadow-md border-2 border-white dark:border-zinc-700 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="flex flex-col gap-0.5 w-full items-center">
                                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 line-clamp-1 truncate w-full px-2">
                                    {user.firstName} {user.lastName}
                                </h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1 break-all">
                                    {user.email}
                                </p>
                            </div>
                            <div className="w-full mt-auto pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50 flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                                <div className="flex justify-between w-full items-center">
                                    <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400">Phone</span>
                                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{user.phone}</span>
                                </div>
                                <div className="flex justify-between w-full items-center">
                                    <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400">Company</span>
                                    <span className="font-medium text-zinc-900 dark:text-zinc-100 truncate max-w-[120px]">{user.company.name}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            )}

            <PaginationControl
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                totalItems={data?.total || 0}
                limit={limit}
                isFetching={isFetching}
                itemName="users"
            />
        </div>
    );
}
