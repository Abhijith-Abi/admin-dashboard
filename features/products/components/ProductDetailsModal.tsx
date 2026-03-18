'use client';

import Image from 'next/image';
import { DetailsModal } from '@/components/shared/DetailsModal';
import { useStore } from '@/store';
import { Star, PackageOpen, LayoutDashboard, Tag } from 'lucide-react';

export function ProductDetailsModal() {
  const { selectedProduct, setSelectedProduct } = useStore();

  if (!selectedProduct) return null;

  return (
    <DetailsModal
      open={!!selectedProduct}
      onOpenChange={(open) => !open && setSelectedProduct(null)}
      title="Product Details"
      titleClassName="bg-linear-to-br from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent"
    >
      <div className="grid gap-6">
        <div className="flex justify-center mb-2">
          <Image 
            src={selectedProduct.thumbnail} 
            alt={`${selectedProduct.title} product image`} 
            width={160}
            height={160}
            priority
            className="h-40 w-40 rounded-2xl border border-zinc-200 dark:border-zinc-800/60 shadow-xl object-contain bg-white dark:bg-zinc-800 p-2"
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{selectedProduct.title}</h2>
          <p className="text-emerald-600 dark:text-emerald-400 font-medium">${selectedProduct.price.toFixed(2)} <span className="text-zinc-400 dark:text-zinc-500 line-through text-sm">${(selectedProduct.price / (1 - selectedProduct.discountPercentage / 100)).toFixed(2)}</span></p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 p-4 rounded-2xl bg-white/60 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800/50 hover:shadow-md transition duration-300">
            <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1">
              <LayoutDashboard className="w-3 h-3" /> Brand
            </span>
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{selectedProduct.brand || 'N/A'}</span>
          </div>
          <div className="flex flex-col gap-1 p-4 rounded-2xl bg-white/60 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800/50 hover:shadow-md transition duration-300">
            <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1">
              <Tag className="w-3 h-3" /> Category
            </span>
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 capitalize">{selectedProduct.category}</span>
          </div>
          <div className="flex flex-col gap-1 p-4 rounded-2xl bg-white/60 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800/50 hover:shadow-md transition duration-300">
            <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1">
              <PackageOpen className="w-3 h-3" /> Stock
            </span>
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{selectedProduct.stock} units</span>
          </div>
          <div className="flex flex-col gap-1 p-4 rounded-2xl bg-white/60 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800/50 hover:shadow-md transition duration-300">
            <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-500" /> Rating
            </span>
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{selectedProduct.rating} / 5.0</span>
          </div>
        </div>
        
        <div className="text-sm text-zinc-600 dark:text-zinc-400 text-center px-4 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/30 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/30">
          {selectedProduct.description}
        </div>
      </div>
    </DetailsModal>
  );
}
