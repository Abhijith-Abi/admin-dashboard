"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useGetProducts } from "@/features/products/api/useGetProducts";
import { useStore } from "@/store";
import {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Star, SearchX } from "lucide-react";
import { PaginationControl } from "@/components/shared/PaginationControl";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Spinner } from "@/components/ui/spinner";
import { ProductTableRow } from "./ProductTableRow";
import { Product } from "@/types";

export function ProductTable({ searchQuery }: { searchQuery: string }) {
    const { setSelectedProduct, viewMode } = useStore();
    const [page, setPage] = React.useState(0);
    const [isPending, startTransition] = React.useTransition();
    const containerRef = React.useRef<HTMLDivElement>(null);
    const limit = 10;

    React.useEffect(() => {
        setPage(0);
    }, [searchQuery]);

    React.useEffect(() => {
        if (page > 0 || viewMode === "grid") {
            const yOffset = -100; // offset for sticky headers if any
            const element = containerRef.current;
            if (element) {
                const y =
                    element.getBoundingClientRect().top +
                    window.scrollY +
                    yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
            }
        }
    }, [page, viewMode]);

    const { data, isFetching } = useGetProducts({
        limit,
        skip: page * limit,
        query: searchQuery,
    });

    const totalPages = data ? Math.ceil(data.total / limit) : 0;

    const handleProductSelect = React.useCallback(
        (product: Product) => {
            setSelectedProduct(product);
        },
        [setSelectedProduct],
    );

    const allProducts = React.useMemo(
        () => data?.products || [],
        [data?.products],
    );

    const parentRef = React.useRef<HTMLDivElement>(null);
    const rowVirtualizer = useVirtualizer({
        count: allProducts.length,
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
                    {(isFetching || isPending) && allProducts.length > 0 && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/30 dark:bg-zinc-900/30 backdrop-blur-[2px] rounded-3xl">
                            <Spinner size="lg" />
                        </div>
                    )}
                    <table className="w-full caption-bottom text-sm relative">
                        <TableHeader className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm sticky top-0 z-20">
                            <TableRow>
                                <TableHead className="py-4 font-semibold text-zinc-900 dark:text-zinc-50">
                                    Product
                                </TableHead>
                                <TableHead className="py-4 font-semibold text-zinc-900 dark:text-zinc-50 hidden sm:table-cell">
                                    Category
                                </TableHead>
                                <TableHead className="py-4 font-semibold text-zinc-900 dark:text-zinc-50 text-right hidden sm:table-cell">
                                    Price
                                </TableHead>
                                <TableHead className="py-4 font-semibold text-zinc-900 dark:text-zinc-50 text-right hidden md:table-cell">
                                    Stock
                                </TableHead>
                                <TableHead className="py-4 font-semibold text-zinc-900 dark:text-zinc-50 text-right pr-5">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            className={
                                isFetching || isPending
                                    ? "opacity-50 transition-opacity duration-300 relative"
                                    : "transition-opacity duration-300 relative"
                            }
                        >
                            {allProducts.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="h-[400px] text-center"
                                    >
                                        <div className="flex flex-col items-center justify-center text-zinc-500">
                                            <div className="h-16 w-16 bg-white/60 dark:bg-zinc-800/60 rounded-full flex items-center justify-center mb-4 border border-zinc-200 dark:border-zinc-700/50 shadow-sm">
                                                <SearchX className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
                                            </div>
                                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-1">
                                                No products found
                                            </h3>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
                                                We couldn&apos;t find any
                                                products matching{" "}
                                                <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                                                    &quot;{searchQuery}&quot;
                                                </span>
                                                . Try checking for typos.
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <>
                                    {rowVirtualizer.getVirtualItems().length >
                                        0 && (
                                        <TableRow>
                                            <TableCell
                                                style={{
                                                    height: `${rowVirtualizer.getVirtualItems()[0]?.start || 0}px`,
                                                }}
                                                colSpan={5}
                                                className="p-0 border-none m-0 leading-none"
                                            />
                                        </TableRow>
                                    )}
                                    {rowVirtualizer
                                        .getVirtualItems()
                                        .map((virtualRow) => {
                                            const product =
                                                allProducts[virtualRow.index];
                                            return (
                                                <ProductTableRow
                                                    key={virtualRow.key}
                                                    product={product}
                                                    onClick={
                                                        handleProductSelect
                                                    }
                                                    ref={
                                                        rowVirtualizer.measureElement
                                                    }
                                                    data-index={
                                                        virtualRow.index
                                                    }
                                                />
                                            );
                                        })}
                                    {rowVirtualizer.getVirtualItems().length >
                                        0 && (
                                        <TableRow>
                                            <TableCell
                                                style={{
                                                    height: `${rowVirtualizer.getTotalSize() - (rowVirtualizer.getVirtualItems()[rowVirtualizer.getVirtualItems().length - 1]?.end || 0)}px`,
                                                }}
                                                colSpan={5}
                                                className="p-0 border-none m-0 leading-none"
                                            />
                                        </TableRow>
                                    )}
                                </>
                            )}
                        </TableBody>
                    </table>
                </div>
            ) : allProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-16 text-center text-zinc-500 rounded-3xl border border-zinc-200 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 shadow-xl shadow-zinc-200/50 dark:shadow-black/40 backdrop-blur-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
                    <div className="h-20 w-20 bg-white/60 dark:bg-zinc-800/60 rounded-full flex items-center justify-center mb-5 border border-zinc-200 dark:border-zinc-700/50 shadow-sm">
                        <SearchX className="h-10 w-10 text-zinc-400 dark:text-zinc-500" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                        No products found
                    </h3>
                    <p className="max-w-md mx-auto text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        We couldn&apos;t find any products matching{" "}
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                            &quot;{searchQuery}&quot;
                        </span>
                        . Try checking for typos or using different keywords.
                    </p>
                </div>
            ) : (
                <div className="relative pt-2">
                    {(isFetching || isPending) && allProducts.length > 0 && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/30 dark:bg-zinc-900/30 backdrop-blur-[2px] rounded-3xl">
                            <Spinner size="lg" />
                        </div>
                    )}
                    <div
                        className={cn(
                            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-300",
                            isFetching || isPending
                                ? "opacity-50"
                                : "opacity-100",
                        )}
                    >
                        {allProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800/60 rounded-3xl p-5 hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 group flex flex-col gap-4 animate-in zoom-in-95"
                                onClick={() => handleProductSelect(product)}
                            >
                                <div className="relative bg-white dark:bg-zinc-800 rounded-2xl w-full h-48 flex items-center justify-center p-4 border border-zinc-100 dark:border-zinc-700/50 overflow-hidden">
                                    <Image
                                        src={product.thumbnail}
                                        alt={product.title}
                                        width={200}
                                        height={200}
                                        className="object-contain h-full w-auto group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 px-1">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-bold text-zinc-900 dark:text-zinc-50 line-clamp-1">
                                            {product.title}
                                        </h3>
                                        <span className="font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                                            ${product.price.toFixed(2)}
                                        </span>
                                    </div>
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400 capitalize">
                                        {product.category}
                                    </span>
                                </div>
                                <div className="mt-auto px-1 pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50 flex justify-between items-center text-sm">
                                    <span
                                        className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${product.stock > 10 ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-red-500/10 text-red-700 dark:text-red-400"}`}
                                    >
                                        {product.stock} IN STOCK
                                    </span>
                                    <div className="flex items-center gap-1.5 text-amber-500">
                                        <Star className="w-4 h-4 fill-amber-500" />
                                        <span className="text-zinc-700 dark:text-zinc-300 font-bold">
                                            {product.rating}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <PaginationControl
                page={page}
                setPage={(val) => startTransition(() => setPage(val))}
                totalPages={totalPages}
                totalItems={data?.total || 0}
                limit={limit}
                isFetching={isFetching || isPending}
                itemName="products"
            />
        </div>
    );
}
