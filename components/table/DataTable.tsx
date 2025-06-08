"use client"
import * as React from "react"

import {
    ColumnDef,
    ColumnFiltersState,
    getFilteredRowModel,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    SortingState,
    useReactTable,
    getSortedRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AddForms from "@/components/AddForms"
import { IoReloadOutline } from "react-icons/io5"
import { DataTableViewOptions } from "@/components/table/DataTableViewOptions"
import { DataTablePagination } from "@/components/table/DataTablePagination"
import { ApiResponse } from "@/types/ApiResponse"
import { Task } from "@/types/Task"
import { AnimalSchema, TaskSchema, TaskTypeSchema, UserSchema } from "@/schemas/RequestSchemas"
import { DialogState } from "../List"
import { z } from "zod"
import { useUser } from "@/context/UserContext"

interface DataTableProps<TData, TValue> {
    title: string;
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    remove: (id: string) => Promise<ApiResponse<null>>;
    update: (id: string, item: TData) => Promise<ApiResponse<TData>>;
    get: () => Promise<ApiResponse<TData[]>>;
    add: (item: TData) => Promise<ApiResponse<TData>>;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<DialogState>>,
    isDialogOpen: DialogState;
    onReload: () => void;
    setEdit: React.Dispatch<React.SetStateAction<string | null>>;
    edit: string | null;
}

export function DataTable<TData extends Record<string, any>, TValue>({
    title,
    columns,
    data,
    update,
    edit,
    setEdit,
    setIsDialogOpen,
    isDialogOpen,
    get, add,
    onReload,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const { user } = useUser();
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onColumnFiltersChange: setColumnFilters,
        onRowSelectionChange: setRowSelection,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const schema = React.useMemo(() => {
        switch (isDialogOpen.type) {
            case 'tasks':
                return { schema: TaskSchema, type: 'Task' as const };
            case 'animals':
                return { schema: AnimalSchema, type: 'Animal' as const };
            case 'users':
                return { schema: UserSchema, type: 'User' as const };
            case 'tasks-types':
                return { schema: TaskTypeSchema, type: 'TaskType' as const };
            default:
                return { schema: z.object({}), type: null };
        }
    }, [isDialogOpen.type]);

    return (
        <main>
            <div className="flex items-center gap-4 py-4">
                {user.role === 'ADMIN' && (
                    <AddForms<TData>
                        title={title}
                        add={add}
                        edit={edit}
                        setEdit={setEdit}
                        schema={schema.schema}
                        update={update}
                        open={isDialogOpen}
                        setOpen={setIsDialogOpen}
                        onReload={onReload}
                    />
                )}
                <Input
                    placeholder={`Pesquisar ${title}...`}
                    value={(table.getColumn("global")?.getFilterValue() as string) ?? ''}
                    onChange={(e) => table.getColumn("global")?.setFilterValue(e.target.value)}
                    className="max-w-sm"
                />
                <Button
                    variant="outline"
                    onClick={onReload}
                    className='text-2xl cursor-pointer hover:scale-110 transition'>
                    <IoReloadOutline />
                </Button>
                <DataTableViewOptions table={table} />
            </div>
            <div className="rounded-md p-4 border">
                <h2 className="text-2xl font-bold p-2">{title}</h2>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {table.getRowModel().rows?.length !== 0 && (
                    <div className="flex flex-col items-center justify-end space-x-2 py-4">
                        <div className="text-muted-foreground flex-1 text-sm mb-4">
                            {table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {table.getFilteredRowModel().rows.length} row(s) selected.
                        </div>
                        <DataTablePagination table={table} />
                    </div>
                )}
            </div>
        </main>
    )
}