import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { Button } from "./ui/button";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { removeItemByID, updateItem } from "@/store/features/items/itemSlice";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";

interface IFormInputs {
    itemName: string;
    itemDesc: string;
    itemCategory: string;
    images: [FileList];
    itemPrice: number;
    itemStock: number;
}
const DeleteModal = ({ handleRemoveItem, selectedItem, setAction }: { handleRemoveItem: any, selectedItem: any, setAction: any }) => {
    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete <span className="text-primary">{selectedItem.itemName}?</span> </AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the
                    item.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setAction("")}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleRemoveItem}>Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    )

}

const EditModal = ({ selectedItem, setAction, dispatch }: { selectedItem: any, setAction: any, dispatch: any }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>();
    const [files, setFiles] = useState<any>();

    const onSubmit = (data: any) => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("images", files[i])
        }

        formData.append("itemID", selectedItem.itemID);
        formData.append("itemName", data.itemName);
        formData.append("itemDesc", data.itemDesc);
        formData.append("itemCategory", data.itemCategory);
        formData.append("itemPrice", data.itemPrice);
        formData.append("itemStock", data.itemStock);

        dispatch(updateItem(formData))
    }

    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Edit <span className="text-primary">{selectedItem.itemName}?</span> </AlertDialogTitle>
            </AlertDialogHeader>
            <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center justify-between">
                    <label htmlFor="itemName">Item Name</label>
                    <div className="flex flex-col w-3/4">
                        <Input id="itemName" type="text" {...register("itemName", { required: true, maxLength: 80, minLength: 2 })} defaultValue={selectedItem.itemName} />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label htmlFor="itemDesc">Item Description</label>
                    <div className="flex flex-col w-3/4">
                        <Input id="itemDesc" type="text" {...register("itemDesc", { required: true, maxLength: 80, minLength: 2 })} defaultValue={selectedItem.itemDesc} />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label htmlFor="itemCategory">Item Category</label>
                    <div className="flex flex-col w-3/4">
                        <Input id="itemCategory" type="text" {...register("itemCategory", { required: true, maxLength: 80, minLength: 2 })} defaultValue={selectedItem.itemCategory[0]} />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label htmlFor="images">Item Images</label>
                    <div className="flex flex-col w-3/4">
                        <Input id="images" type="file" {...register("images")} onChange={(e) => setFiles(e.target.files)} accept="image/*" multiple />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label htmlFor="itemPrice">Item Price</label>
                    <div className="flex flex-col w-3/4">
                        <Input id="itemPrice" type="text" {...register("itemPrice")} defaultValue={selectedItem.itemPrice} />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label htmlFor="itemQuantity">Item Quantity</label>
                    <div className="flex flex-col w-3/4">
                        <Input id="itemQuantity" type="text" {...register("itemStock")} defaultValue={selectedItem.itemStock}/>
                    </div>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setAction("")}>Cancel</AlertDialogCancel>
                    <Button type="submit">Save Changes</Button>
                </AlertDialogFooter>
            </form>
        </AlertDialogContent>
    )
}

const SellerTable = () => {
    const vendorItems = useAppSelector((state: RootState) => state.vendor.items);
    const dispatch = useAppDispatch();
    const [selectedItem, setSelectedItem] = useState<{ itemID: string, itemName: string, itemStock: number, itemDesc: string, itemPrice: number, itemCategory: string[] }>({
        itemID: "",
        itemName: "",
        itemStock: 0,
        itemDesc: "",
        itemPrice: 0,
        itemCategory: [],
    });
    const [action, setAction] = useState("");

    const handleRemoveItem = () => {
        dispatch(removeItemByID(selectedItem.itemID));
        setSelectedItem({
            itemID: "",
            itemName: "",
            itemStock: 0,
            itemDesc: "",
            itemPrice: 0,
            itemCategory: []
        });
        window.location.reload();
    }

    return (
        vendorItems.length > 0 ?
            <AlertDialog>
                {
                    action === "delete" ?
                        <DeleteModal handleRemoveItem={handleRemoveItem} selectedItem={selectedItem} setAction={setAction} />
                        :
                        <EditModal selectedItem={selectedItem} setAction={setAction} dispatch={dispatch} />
                }

                <Table>
                    <TableCaption>A list of your items.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Item Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            vendorItems.map(item => (
                                <TableRow key={item._id}>
                                    <TableCell className="font-medium">{item.itemName}</TableCell>
                                    <TableCell>
                                        {
                                            item.itemCategory.map(item => (
                                                <p key={item}>{item}</p>
                                            ))
                                        }
                                    </TableCell>
                                    <TableCell>{item.itemStock}</TableCell>
                                    <TableCell>₱ {item.itemPrice}</TableCell>
                                    <TableCell className="text-right">
                                        <AlertDialogTrigger asChild>
                                            <Button size="icon" variant="ghost" onClick={() => {
                                                setSelectedItem({
                                                    itemID: item._id,
                                                    itemName: item.itemName,
                                                    itemStock: item.itemStock,
                                                    itemDesc: item.itemDesc,
                                                    itemPrice: item.itemPrice,
                                                    itemCategory: item.itemCategory,
                                                })
                                                setAction("delete")
                                            }
                                            }>
                                                <Trash2Icon size={16} />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogTrigger asChild>
                                            <Button size="icon" variant="ghost" onClick={() => {
                                                setAction("edit")
                                                setSelectedItem({
                                                    itemID: item._id,
                                                    itemName: item.itemName,
                                                    itemStock: item.itemStock,
                                                    itemDesc: item.itemDesc,
                                                    itemPrice: item.itemPrice,
                                                    itemCategory: item.itemCategory,
                                                })
                                            }}>
                                                <Edit2Icon size={16} />
                                            </Button>
                                        </AlertDialogTrigger>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table >
            </AlertDialog>
            :
            <p className="text-center">Your items will go here</p>
    )
}

export default SellerTable