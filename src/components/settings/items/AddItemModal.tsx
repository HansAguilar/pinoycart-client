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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface IFormInputs {
    itemName: string;
    itemDesc: string;
    itemCategory: string;
    images: [FileList];
    itemPrice: number;
    itemStock: number;
}
const AddItemModal = ({ items, setItems }: { items: any; setItems: React.Dispatch<React.SetStateAction<any[]>> }) => {
    const { register, handleSubmit, reset } = useForm<IFormInputs>();
    const [files, setFiles] = useState<any>();
    const [selectedOption, setSelectedOption] = useState("");
    const [showErrorFile, setShowErrorFile] = useState(false);

    const dispatch = useAppDispatch();
    const user = useAppSelector((state: RootState) => state.auth.data);

    const [previewImages, setPreviewImages] = useState<any[]>([]);

    const handleFileChange = (e: any) => {
        const files = e.target.files;
        if (files) {
            const imageFiles = Array.from(files).filter((file: any) => file.type.startsWith('image/'));
            Promise.all(imageFiles.map(fileToDataURL)).then((imageDataURLs) => {
                setPreviewImages(imageDataURLs);
            });
        }
    };

    const fileToDataURL = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const onSubmit = (data: any) => {
        if (files.length <= 4) {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append("images", files[i])
            }

            formData.append("itemName", data.itemName);
            formData.append("itemDesc", data.itemDesc);
            formData.append("itemCategory", selectedOption);
            formData.append("itemPrice", data.itemPrice);
            formData.append("itemStock", data.itemStock);
            formData.append("userID", user?._id as string);
            dispatch(addItem(formData))

            const newItem = {
                itemName: data.itemName,
                itemDesc: data.itemDesc,
                itemCategory: selectedOption,
                itemPrice: data.itemPrice,
                itemStock: data.itemStock,
                userID: user?._id as string,
            };

            setPreviewImages([])

            // Update items state with the new item object
            setItems((prevItems: any[]) => ([...prevItems, newItem]));

            toast.success("Item added successfully", { duration: 2000 })
            reset();
        }
    }

    const handleSelectChange = (event: string) => {
        setSelectedOption(event);
    };

    const options = [
        { value: 'Electronics', label: 'Electronics' },
        { value: 'Clothing & Accessories', label: 'Clothing & Accessories' },
        { value: 'Home & Kitchen', label: 'Home & Kitchen' },
        { value: 'Books & Media', label: 'Books & Media' },
        { value: 'Health & Beauty', label: 'Health & Beauty' },
        { value: "Toys & Games", label: 'Toys & Games' },
        { value: 'Sports & Outdoors', label: 'Sports & Outdoors' },
        { value: 'Automotive', label: 'Automotive' },
        { value: 'Furniture & Decor', label: 'Furniture & Decor' },
        { value: 'Jewelry & Watches', label: 'Jewelry & Watches' },
    ];

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
                    <Select name='itemCategory' onValueChange={(e: any) => handleSelectChange(e)}>
                        <SelectTrigger className="">
                            <SelectValue id='itemCategory' placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map(item => (
                                <SelectItem id='itemCategory' key={item.value} value={item.value}>{item.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label className='font-medium text-sm' htmlFor="images">Item Images</label>
                    <Input id="images" type="file" className='hidden' accept="image/jpeg, image/png" {...register("images", { required: true })} onChange={(e) => {
                        setFiles(e.target.files)
                        handleFileChange(e)
                    }} multiple />
                    <div className='flex items-center overflow-auto'>
                        {previewImages.map((imageDataURL, index) => (
                            <img
                                key={index}
                                src={imageDataURL}
                                alt={`Preview ${index + 1}`}
                                className='h-56 '
                            />
                        ))}
                    </div>
                    {files && files.length >= 5 ? <p className='text-sm font-medium text-destructive'>4 images only</p> : null}
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
                    <DialogClose className='bg-secondary p-2 rounded hover:bg-secondary/70' onClick={() => {
                        reset()
                        setPreviewImages([])
                    }}>
                        Cancel
                    </DialogClose>
                    <Button className="max-w-max" type="submit">Add Item</Button>
                </div>
            </form>
        </DialogContent >
    )
}

export default AddItemModal