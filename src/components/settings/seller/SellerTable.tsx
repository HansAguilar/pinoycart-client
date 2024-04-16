import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { MoreHorizontal } from "lucide-react";
import { removeItemByID } from "@/store/features/items/itemSlice";
import { useEffect, useState } from "react";
import { DialogTrigger } from "../../ui/dialog";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DeleteModal } from "../items/DeleteModal";
import { EditModal } from "../items/EditModal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import CustomPagination from "./CustomPagination";
import { IItems } from "@/store/features/items/itemTypes";

const SellerTable = ({ items, setItems }: { items: IItems[], setItems: any }) => {
    const vendor = useAppSelector((state: RootState) => state.vendor);
    const dispatch = useAppDispatch();
    const [action, setAction] = useState("");

    const [selectedItem, setSelectedItem] = useState<IItems>({
        _id: "",
        itemName: "",
        itemStock: 0,
        itemDesc: "",
        itemPrice: 0,
        itemCategory: "",
        itemImages: []
    });

    const handleAction = (modal: string, item: any) => {
        setAction(modal)
        setSelectedItem({
            _id: item._id,
            itemName: item.itemName,
            itemStock: item.itemStock,
            itemDesc: item.itemDesc,
            itemPrice: item.itemPrice,
            itemCategory: item.itemCategory,
            itemImages: item.itemImages
        })
    }

    const handleRemoveItem = () => {
        const filteredItems = items.filter((item: any) => item._id !== selectedItem._id);
        setItems(filteredItems);
        dispatch(removeItemByID(selectedItem._id));
        setSelectedItem({
            _id: "",
            itemName: "",
            itemStock: 0,
            itemDesc: "",
            itemPrice: 0,
            itemCategory: "",
            itemImages: []
        });
    }

    const [currentPage, setCurrentPage] = useState<number>(1);
    const ITEMS_PER_PAGE = 8; // Number of items to show per page
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        setItems(vendor.items)
        setTotalPages(Math.ceil(items?.length / ITEMS_PER_PAGE));
    }, [setItems, items, dispatch, vendor])

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (vendor.loading) {
        return <p>Loading</p>
    }

    return (
        <>
            <DialogTrigger className="bg-secondary max-w-max p-2 font-medium text-sm mt-4 ml-auto">Add Item</DialogTrigger>
            <AlertDialog>
                {
                    action == "delete" ?
                        <DeleteModal handleRemoveItem={handleRemoveItem} selectedItem={selectedItem} setAction={setAction} />
                        :
                        <EditModal selectedItem={selectedItem} setAction={setAction} dispatch={dispatch} items={items} setItems={setItems} />
                }
                {
                    items?.length > 0 ?
                        <>
                            <Table className="overflow-y-auto h-40">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[300px]">Item Name</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Stock</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        items.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((item) => (
                                            <TableRow key={item._id}>
                                                <TableCell>{item.itemName}</TableCell>
                                                <TableCell>{item.itemCategory}</TableCell>
                                                <TableCell>{item.itemStock}</TableCell>
                                                <TableCell>₱ {item.itemPrice}</TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Open menu</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">

                                                            <AlertDialogTrigger asChild>
                                                                <DropdownMenuItem onClick={() => handleAction("edit", item)}>
                                                                    Edit
                                                                </DropdownMenuItem>
                                                            </AlertDialogTrigger>

                                                            <AlertDialogTrigger asChild>
                                                                <DropdownMenuItem onClick={() => handleAction("delete", item)}>
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </AlertDialogTrigger>

                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>

                            <Separator />

                            <CustomPagination
                                totalPages={totalPages}
                                handlePageChange={handlePageChange}
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                            />
                        </>
                        :
                        <p className="text-center">Your items will go here</p>
                }
            </AlertDialog >
        </>
    )
}

export default SellerTable