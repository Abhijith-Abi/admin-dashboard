'use client';

import Image from 'next/image';

import { DetailsModal } from '@/components/shared/DetailsModal';
import { useStore } from '@/store';

export function UserDetailsModal() {
  const { selectedUser, setSelectedUser } = useStore();

  const handleOpenChange = (open: boolean) => {
    if (!open) setSelectedUser(null);
  };

  if (!selectedUser) return null;

  return (
    <DetailsModal
      open={!!selectedUser}
      onOpenChange={handleOpenChange}
      title="User Details"
      description={`Detailed information about ${selectedUser.firstName} ${selectedUser.lastName}.`}
    >
      <div className="grid gap-4">
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
    </DetailsModal>
  );
}
