import * as React from "react";
import Image from "next/image";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Star } from "lucide-react";
import { Product } from "@/types";

interface ProductTableRowProps {
    product: Product;
    onClick: (product: Product) => void;
    "data-index"?: number;
}

export const ProductTableRow = React.memo(React.forwardRef<HTMLTableRowElement, ProductTableRowProps>(
    function ProductTableRow({ product, onClick, ...props }, ref) {
        return (
            <TableRow
                ref={ref}
                {...props}
                className="group cursor-pointer transition-all duration-300 hover:bg-white/80 dark:hover:bg-zinc-800/80 hover:shadow-md hover:-translate-y-0.5 relative z-0 hover:z-10 border-b border-zinc-200 dark:border-zinc-800/50"
                onClick={() => onClick(product)}
            >
                <TableCell className="font-medium flex items-center gap-4 py-4 pr-2">
                    <Image
                        src={product.thumbnail}
                        alt={`${product.title} thumbnail`}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50 object-cover"
                    />
                    <div className="flex flex-col">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                            {product.title}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 sm:hidden flex items-center gap-1.5 mt-0.5">
                            <span className="capitalize">{product.category}</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
                            <span className="font-medium text-emerald-600 dark:text-emerald-400">${product.price.toFixed(2)}</span>
                        </span>
                    </div>
                </TableCell>
                <TableCell className="text-zinc-600 dark:text-zinc-400 py-4 hidden sm:table-cell capitalize">
                    {product.category}
                </TableCell>
                <TableCell className="text-zinc-900 dark:text-zinc-100 font-semibold py-4 text-right hidden sm:table-cell">
                    ${product.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-zinc-600 dark:text-zinc-400 py-4 text-right hidden md:table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 10 ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-red-500/10 text-red-600 dark:text-red-400"}`}>
                        {product.stock}
                    </span>
                </TableCell>
                <TableCell className="py-4 text-right pr-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick(product);
                        }}
                    >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Details</span>
                    </Button>
                </TableCell>
            </TableRow>
        );
    }
));
