'use client';

import Image from 'next/image';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useStore } from '@/store';

export function UserDetailsModal() {
  const { selectedUser, setSelectedUser } = useStore();

  const handleOpenChange = (open: boolean) => {
    if (!open) setSelectedUser(null);
  };

  if (!selectedUser) return null;

  return (
    <Dialog open={!!selectedUser} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] overflow-hidden border border-white/40 dark:border-white/10 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl shadow-2xl rounded-3xl">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Detailed information about {selectedUser.firstName} {selectedUser.lastName}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center mb-4">
            <Image 
              src={selectedUser.image} 
              alt={`${selectedUser.firstName} ${selectedUser.lastName} profile picture`} 
              width={112}
              height={112}
              priority
              className="h-28 w-28 rounded-full border-4 border-white/60 dark:border-zinc-800/60 shadow-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-1 sm:gap-4">
            <span className="font-semibold text-left sm:text-right text-sm text-zinc-500 sm:text-zinc-900 dark:text-zinc-400 dark:sm:text-zinc-50">Name</span>
            <span className="col-span-1 sm:col-span-3 text-sm">{selectedUser.firstName} {selectedUser.lastName}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-1 sm:gap-4">
            <span className="font-semibold text-left sm:text-right text-sm text-zinc-500 sm:text-zinc-900 dark:text-zinc-400 dark:sm:text-zinc-50">Email</span>
            <span className="col-span-1 sm:col-span-3 text-sm">{selectedUser.email}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-1 sm:gap-4">
            <span className="font-semibold text-left sm:text-right text-sm text-zinc-500 sm:text-zinc-900 dark:text-zinc-400 dark:sm:text-zinc-50">Phone</span>
            <span className="col-span-1 sm:col-span-3 text-sm">{selectedUser.phone}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-1 sm:gap-4">
            <span className="font-semibold text-left sm:text-right text-sm text-zinc-500 sm:text-zinc-900 dark:text-zinc-400 dark:sm:text-zinc-50">Age</span>
            <span className="col-span-1 sm:col-span-3 text-sm">{selectedUser.age}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-1 sm:gap-4">
            <span className="font-semibold text-left sm:text-right text-sm text-zinc-500 sm:text-zinc-900 dark:text-zinc-400 dark:sm:text-zinc-50">Gender</span>
            <span className="col-span-1 sm:col-span-3 text-sm capitalize">{selectedUser.gender}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-1 sm:gap-4">
            <span className="font-semibold text-left sm:text-right text-sm text-zinc-500 sm:text-zinc-900 dark:text-zinc-400 dark:sm:text-zinc-50">Address</span>
            <span className="col-span-1 sm:col-span-3 text-sm">
              {selectedUser.address.address}<br/>
              {selectedUser.address.city}, {selectedUser.address.state}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-1 sm:gap-4">
            <span className="font-semibold text-left sm:text-right text-sm text-zinc-500 sm:text-zinc-900 dark:text-zinc-400 dark:sm:text-zinc-50">Company</span>
            <span className="col-span-1 sm:col-span-3 text-sm">
              {selectedUser.company.name}<br/>
              <span className="text-zinc-500 text-xs">{selectedUser.company.title} ({selectedUser.company.department})</span>
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
