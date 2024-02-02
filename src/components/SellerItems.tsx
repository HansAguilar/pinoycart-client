import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/features/items/itemSlice";
import { Separator } from "./ui/separator";

interface IFormInputs {
    itemName: string;
    itemDesc: string;
    itemCategory: string;
    images: [FileList];
    itemPrice: number;
    itemQuantity: number;
}

const SellerItems = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>();
    const [files, setFiles] = useState<any>();
    const dispatch = useAppDispatch();

    const onSubmit = (data: any) => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("images", files[i])
        }

        formData.append("itemName", data.itemName);
        formData.append("itemDesc", data.itemDesc);
        formData.append("itemCategory", data.itemCategory);
        formData.append("itemPrice", data.itemPrice);
        formData.append("itemQuantity", data.itemQuantity);
        dispatch(addItem(formData))
    }

    return (
        <>
            <div>
                <h3 className="text-lg font-medium">Items</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    This is where you can add and view items.
                </p>
            </div>

            <Separator />

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                <div className="flex items-center justify-between">
                    <label htmlFor="itemName">Item Name</label>
                    <div className="flex flex-col w-3/4">
                        <Input id="itemName" type="text" {...register("itemName", { required: true, maxLength: 80, minLength: 2 })} />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label htmlFor="itemDesc">Item Description</label>
                    <div className="flex flex-col w-3/4">
                        <Input id="itemDesc" type="text" {...register("itemDesc", { required: true, maxLength: 80, minLength: 2 })} />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label htmlFor="itemCategory">Item Category</label>
                    <div className="flex flex-col w-3/4">
                        <Input id="itemCategory" type="text" {...register("itemCategory", { required: true, maxLength: 80, minLength: 2 })} />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label htmlFor="images">Item Images</label>
                    <div className="flex flex-col w-3/4">
                        <Input id="images" type="file" {...register("images")} onChange={(e) => setFiles(e.target.files)} multiple />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label htmlFor="itemPrice">Item Price</label>
                    <div className="flex flex-col w-3/4">
                        <Input id="itemPrice" type="text" {...register("itemPrice")} />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label htmlFor="itemQuantity">Item Quantity</label>
                    <div className="flex flex-col w-3/4">
                        <Input id="itemQuantity" type="text" {...register("itemQuantity")} />
                    </div>
                </div>
                <Button className="max-w-max" type="submit"> Add Item</Button>
            </form>

        </>

    )
}

export default SellerItems