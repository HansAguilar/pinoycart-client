import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export type TableType = {
    _id: string;
    itemName: string;
    itemCategory: string;
    itemPrice: number;
    itemStock: number;
}

// export const columns: ColumnDef<TableType>[] = [
//     {
//         header: "",
//         accessorKey: '_id',
//         cell: ({ row }) => { }
//     },
//     {
//         accessorKey: "itemName",
//         header: () => <div>Item Name</div>,
//         cell: ({ row }) => {
//             return <div className="font-medium text-wrap">{row.getValue<string>("itemName")}</div>
//         },
//     },
//     {
//         accessorKey: "itemCategory",
//         header: "Item Category",
//     },
//     {
//         accessorKey: "itemPrice",
//         header: () => <div className="text-right">Item Price</div>,
//         cell: ({ row }) => {
//             const amount = parseFloat(row.getValue("itemPrice"))
//             const formatted = new Intl.NumberFormat("en-US", {
//                 style: "currency",
//                 currency: "PHP",
//             }).format(amount)

//             return <div className="text-right font-medium">{formatted}</div>
//         }
//     },
//     {
//         accessorKey: "itemStock",
//         header: "Item Stock",
//     },
//     {
//         id: "actions",
//         cell: ({ row }) => {
//             return (
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0">
//                             <span className="sr-only">Open menu</span>
//                             <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                         <DropdownMenuItem onClick={() => setAction("edit", row.original)}>Edit</DropdownMenuItem>
//                         <DropdownMenuItem onClick={() => setAction("delete", row.original)}>Delete</DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             )
//         },
//     },
// ]


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    setAction?: (rowData: TData) => void;
    setSelectedItem?: (rowData: TData) => void;
}

export function DataTable<TData, TValue>({ columns, data, setAction, setSelectedItem }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="rounded-md border">
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
        </div>
    )
}
