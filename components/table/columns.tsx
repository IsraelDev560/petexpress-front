import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { ApiResponse } from "@/types/ApiResponse";
import { Dispatch, SetStateAction } from "react";
import { DialogState } from "../List";

export function generateColumns<T extends Record<string, any>>(
    data: T[],
    title: string,
    onReload: () => void,
    remove: (id: string) => Promise<ApiResponse<null>>,
    setIsDialogOpen: Dispatch<SetStateAction<DialogState>>,
    setEdit: Dispatch<SetStateAction<string | null>>,
): ColumnDef<T>[] {

    const actionColumn: ColumnDef<T> = {
        id: "actions",
        cell: ({ row }) => {
            const item = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {/* <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(item.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                            remove(String(item.id))
                            setTimeout(() => onReload(), 300);
                        }}>
                            Delete
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => {
                            setIsDialogOpen({ open: true, type: mapTitleToType(title), });
                            setEdit(String(item.id))
                        }}>
                            Update
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu >
            );
        }
    };

    const globalColumn: ColumnDef<T> = {
        id: "global",
        accessorFn: row => row, 
        filterFn: (row, _columnId, value) => {
            return Object.entries(row.original).some(([key, val]) => {
                if (["select", "actions"].includes(key)) return false;
                return String(val).toLowerCase().includes(String(value).toLowerCase());
            });
        },
        header: () => null,
        cell: () => null,
        enableColumnFilter: true,
        enableSorting: false,
    };


    const selectColumn: ColumnDef<T> = {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    }

    if (!data.length) return [];

    return [
        globalColumn,
        selectColumn,
        ...Object.keys(data[0]).map((key) => {
            if (key === 'name' || key === 'username') {
                return {
                    accessorKey: key,
                    header: ({ column }: { column: Column<T> }) => (
                        <DataTableColumnHeader column={column} title="Name" />
                    )
                }
            }
            return {
                accessorKey: key as keyof T,
                header: () => key.charAt(0).toUpperCase() + key.slice(1),
                cell: ({ row }: { row: Row<T> }) => (
                    <div className="text-muted-foreground">{String(row.getValue(key))}</div>
                ),
            }
        }), actionColumn] as ColumnDef<T>[]
}

export const mapTitleToType = (title: string): DialogState["type"] => {
    switch (title) {
        case "Users": return "users";
        case "Animals": return "animals";
        case "Tasks": return "tasks";
        case "Tasks-Types": return "tasks-types";
        default: return undefined;
    }
};
