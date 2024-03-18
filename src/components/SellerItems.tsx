import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem } from "@/store/features/items/itemSlice";
import { Separator } from "./ui/separator";
import SellerTable from "./SellerTable";
import { toast } from "sonner";
import { RootState } from "@/store/store";
interface IFormInputs {
    itemName: string;
    itemDesc: string;
    itemCategory: string;
    images: [FileList];
    itemPrice: number;
    itemStock: number;
}

const SellerItems = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>();
    const [files, setFiles] = useState<any>();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state: RootState) => state.auth.data)

    const onSubmit = (data: any) => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("images", files[i])
        }

        formData.append("itemName", data.itemName);
        formData.append("itemDesc", data.itemDesc);
        formData.append("itemCategory", data.itemCategory);
        formData.append("itemPrice", data.itemPrice);
        formData.append("itemStock", data.itemStock);
        formData.append("userID", user?._id as string);
        dispatch(addItem(formData))
        toast.success("Item added successfully", { duration: 2000 })
    }

    return (
        <main className="flex container m-auto flex-col gap-4 w-full">

            <div className="w-10/12 px-8">
                <div>
                    <h3 className="text-lg font-medium">Items</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        This is where you can add and view items.
                    </p>
                </div>

                <Separator />

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">

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
                            <Input id="images" type="file" accept="image/*" {...register("images")} onChange={(e) => setFiles(e.target.files)} multiple />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label htmlFor="itemPrice">Item Price</label>
                        <div className="flex flex-col w-3/4">
                            <Input id="itemPrice" type="text" {...register("itemPrice")} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label htmlFor="itemStock">Item Quantity</label>
                        <div className="flex flex-col w-3/4">
                            <Input id="itemStock" type="text" {...register("itemStock")} />
                        </div>
                    </div>
                    <Button className="max-w-max" type="submit"> Add Item</Button>
                </form>

                <Separator />

                <SellerTable />
            </div>
        </main>

    )
}

export default SellerItems