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
import AddForm from "@/components/AddForm"
import { IoReloadOutline } from "react-icons/io5"
import { DataTableViewOptions } from "@/components/table/DataTableViewOptions"
import { DataTablePagination } from "@/components/table/DataTablePagination"
import { ApiResponse } from "@/types/ApiResponse"

interface DataTableProps<TData, TValue> {
    title: string;
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    setData: (data: TData[]) => void;
    remove: (id: string) => Promise<ApiResponse<null>>;
    update: (id: string, item: TData) => Promise<ApiResponse<TData>>;
    get: () => Promise<ApiResponse<TData[]>>;
    add: (item: TData) => Promise<ApiResponse<TData>>;
    onReload: () => void;
}

export function DataTable<TData, TValue>({
    title,
    columns,
    data,
    setData,
    get, add,
    onReload,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
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
    return (
        <div>
            <div className="flex items-center gap-4 py-4">
                <AddForm
                    add={add}
                    setData={(item: TData) => setData([...data, item])}
                    columns={columns}
                    title={title}
                />
                <Input
                    placeholder={`Filtrar ${title}...`}
                    value={(table?.getColumn('name')?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table?.getColumn('name')?.setFilterValue(event.target.value)
                    }
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
        </div>
    )
}