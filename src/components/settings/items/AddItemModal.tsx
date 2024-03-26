import { useState } from 'react'
import { Input } from '../../ui/input';
import { addItem } from '@/store/features/items/itemSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { useForm } from 'react-hook-form';
import { Button } from '../../ui/button';
import { toast } from 'sonner';
import {
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from '../../ui/separator';

interface IFormInputs {
    itemName: string;
    itemDesc: string;
    itemCategory: string;
    images: [FileList];
    itemPrice: number;
    itemStock: number;
}
const AddItemModal = ({ items, setItems }: { items: any; setItems: React.Dispatch<React.SetStateAction<any[]>> }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInputs>();
    const [files, setFiles] = useState<any>();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state: RootState) => state.auth.data);

    const onSubmit = (data: any) => {
        if (files.length <= 4) {
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

            const newItem = {
                itemName: data.itemName,
                itemDesc: data.itemDesc,
                itemCategory: data.itemCategory,
                itemPrice: data.itemPrice,
                itemStock: data.itemStock,
                userID: user?._id as string,
            };

            // Update items state with the new item object
            setItems((prevItems: any[]) => ([...prevItems, newItem]));

            toast.success("Item added successfully", { duration: 2000 })
            reset();
        }
    }



    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add an Item</DialogTitle>
            </DialogHeader>

            <Separator />

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                <div className="flex flex-col gap-2 w-full">
                    <label className='font-medium text-sm' htmlFor="itemName">Item Name</label>
                    <Input id="itemName" type="text" {...register("itemName", { required: true, maxLength: 80, minLength: 2 })} />
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label className='font-medium text-sm' htmlFor="itemDesc">Item Description</label>
                    <Input id="itemDesc" type="text" {...register("itemDesc", { required: true, maxLength: 80, minLength: 2 })} />
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label className='font-medium text-sm' htmlFor="itemCategory">Item Category</label>
                    <Input id="itemCategory" type="text" {...register("itemCategory", { required: true, maxLength: 80, minLength: 2 })} />
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label className='font-medium text-sm' htmlFor="images">Item Images</label>
                    <Input id="images" type="file" accept="image/jpeg, image/png" {...register("images", { required: true })} onChange={(e) => setFiles(e.target.files)} multiple />
                    {files && files.length >= 5 && <p className='text-sm font-medium text-destructive'>4 images only</p>}
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label className='font-medium text-sm' htmlFor="itemPrice">Item Price</label>
                    <Input id="itemPrice" type="text" {...register("itemPrice", { required: true, min: 1 })} />
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label className='font-medium text-sm' htmlFor="itemStock">Item Quantity</label>
                    <Input id="itemStock" type="text" {...register("itemStock", { required: true, min: 1 })} />
                </div>

                <div className='flex items-center justify-end gap-4'>
                    <DialogClose onClick={() => reset()}>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button className="max-w-max" type="submit">Add Item</Button>
                </div>
            </form>
        </DialogContent >
    )
}

export default AddItemModal