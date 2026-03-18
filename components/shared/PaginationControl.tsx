import * as React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationControlProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalItems: number;
  limit: number;
  isFetching: boolean;
  itemName: string;
}

export function PaginationControl({
  page,
  setPage,
  totalPages,
  totalItems,
  limit,
  isFetching,
  itemName,
}: PaginationControlProps) {
  if (totalPages <= 0) return null;

  const canGoPrevious = page > 0;
  const canGoNext = page < totalPages - 1;

  return (
    <div className="flex items-center justify-between px-2">
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        Showing <span className="font-medium text-zinc-900 dark:text-zinc-50">{page * limit + 1}</span> to{' '}
        <span className="font-medium text-zinc-900 dark:text-zinc-50">
          {Math.min((page + 1) * limit, totalItems)}
        </span>{' '}
        of <span className="font-medium text-zinc-900 dark:text-zinc-50">{totalItems}</span> {itemName}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          aria-label="First page"
          className="hidden h-9 w-9 lg:flex rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm border border-zinc-200 dark:border-zinc-800/60 text-zinc-700 dark:text-zinc-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer disabled:cursor-not-allowed"
          onClick={() => React.startTransition(() => setPage(0))}
          disabled={!canGoPrevious || isFetching}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Previous page"
          className="h-9 w-9 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm border border-zinc-200 dark:border-zinc-800/60 text-zinc-700 dark:text-zinc-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer disabled:cursor-not-allowed"
          onClick={() => React.startTransition(() => setPage((p) => Math.max(0, p - 1)))}
          disabled={!canGoPrevious || isFetching}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Next page"
          className="h-9 w-9 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm border border-zinc-200 dark:border-zinc-800/60 text-zinc-700 dark:text-zinc-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer disabled:cursor-not-allowed"
          onClick={() => React.startTransition(() => setPage((p) => Math.min(totalPages - 1, p + 1)))}
          disabled={!canGoNext || isFetching}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Last page"
          className="hidden h-9 w-9 lg:flex rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm border border-zinc-200 dark:border-zinc-800/60 text-zinc-700 dark:text-zinc-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer disabled:cursor-not-allowed"
          onClick={() => React.startTransition(() => setPage(totalPages - 1))}
          disabled={!canGoNext || isFetching}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
