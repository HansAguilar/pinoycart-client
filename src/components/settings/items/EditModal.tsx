import { AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateItem } from "@/store/features/items/itemSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export type IFormInputs = {
    itemID: string;
    itemName: string;
    itemDesc: string;
    itemCategory: string;
    itemPrice: number;
    itemStock: number;
    images: File[];
}

export const EditModal = ({ selectedItem, setAction, dispatch, items, setItems }: { selectedItem: any, setAction: any, dispatch: any, items: any, setItems: any }) => {
    const { register, handleSubmit } = useForm<IFormInputs>();
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

        // Update items state with the edited item
        const updatedItems = items.map((item: any) => {
            if (item.itemID === selectedItem.itemID) {
                // Update the item with edited data
                return {
                    ...item,
                    itemName: data.itemName,
                    itemDesc: data.itemDesc,
                    itemCategory: data.itemCategory,
                    itemPrice: data.itemPrice,
                    itemStock: data.itemStock,
                    // Add other properties as needed
                };
            }
            return item; // Return unchanged item if not the selected one
        });
        setItems(updatedItems);
        toast.success("Item Updated Successfully", { duration: 2000 })
    }

    return (
        <AlertDialogContent className="min-h-[80%] h-[80%] overflow-auto w-11/12">
            <AlertDialogHeader>
                <AlertDialogTitle>Edit <span className="text-primary">{selectedItem.itemName}?</span> </AlertDialogTitle>
            </AlertDialogHeader>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2 w-full">
                    <label className="font-medium text-sm" htmlFor="itemName">Item Name</label>
                    <Input id="itemName" type="text"  {...register("itemName", { required: true, maxLength: 80, minLength: 2 })} defaultValue={selectedItem.itemName} />
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label className="font-medium text-sm" htmlFor="itemDesc">Item Description</label>
                    <Input id="itemDesc" type="text" {...register("itemDesc", { required: true, maxLength: 80, minLength: 2 })} defaultValue={selectedItem.itemDesc} />
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label className="font-medium text-sm" htmlFor="itemCategory">Item Category</label>
                    <Input id="itemCategory" type="text" {...register("itemCategory", { required: true, maxLength: 80, minLength: 2 })} defaultValue={selectedItem.itemCategory[0]} />
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label className="font-medium text-sm" htmlFor="images">Item Images</label>
                    <Input id="images" type="file" {...register("images")} onChange={(e) => setFiles(e.target.files)} accept="image/jpeg, image/png" multiple />
                    <div className="flex items-center overflow-x-auto">
                        {
                            selectedItem.itemImages?.map((image: string) => (
                                <img src={`http://localhost:3000/uploads/${image}`} alt=":)" key={image} className="h-32 w-36 aspect-auto object-fill" />
                            ))
                        }
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label className="font-medium text-sm" htmlFor="itemPrice">Item Price</label>
                    <Input id="itemPrice" type="text" {...register("itemPrice")} defaultValue={selectedItem.itemPrice} />
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label className="font-medium text-sm" htmlFor="itemQuantity">Item Quantity</label>
                    <Input id="itemQuantity" type="text" {...register("itemStock")} defaultValue={selectedItem.itemStock} />
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setAction("")}>Cancel</AlertDialogCancel>
                    <Button type="submit">Save Changes</Button>
                </AlertDialogFooter>
            </form>
        </AlertDialogContent>
    )
}