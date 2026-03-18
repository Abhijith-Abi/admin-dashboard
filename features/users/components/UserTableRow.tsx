import * as React from "react";
import Image from "next/image";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { User } from "@/types";

interface UserTableRowProps {
    user: User;
    onClick: (user: User) => void;
    "data-index"?: number;
}

export const UserTableRow = React.memo(React.forwardRef<HTMLTableRowElement, UserTableRowProps>(
    function UserTableRow({ user, onClick, ...props }, ref) {
        return (
            <TableRow
                ref={ref}
                {...props}
                className="group cursor-pointer transition-all duration-300 hover:bg-white/80 dark:hover:bg-zinc-800/80 hover:shadow-md hover:-translate-y-0.5 relative z-0 hover:z-10 border-b border-zinc-200 dark:border-zinc-800/50"
                onClick={() => onClick(user)}
            >
                <TableCell className="font-medium flex items-center gap-4 py-4 pr-2">
                    <Image
                        src={user.image}
                        alt={`${user.firstName} ${user.lastName} profile`}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50 object-cover"
                    />
                    <div className="flex flex-col">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                            {user.firstName} {user.lastName}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 sm:hidden">
                            {user.email}
                        </span>
                    </div>
                </TableCell>
                <TableCell className="text-zinc-600 dark:text-zinc-400 py-4 hidden sm:table-cell">
                    {user.email}
                </TableCell>
                <TableCell className="text-zinc-600 dark:text-zinc-400 py-4 hidden md:table-cell">
                    {user.phone}
                </TableCell>
                <TableCell className="py-4 text-right pr-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick(user);
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
