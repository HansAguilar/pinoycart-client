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
import { UploadCloudIcon } from 'lucide-react';

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
    { value: 'Musical Instruments', label: 'Musical Instruments' }, 
];


interface IFormInputs {
    itemName: string;
    itemDesc: string;
    images: File[];
    itemPrice: number;
    itemStock: number;
}
const AddItemModal = ({ items, setItems }: { items: any; setItems: React.Dispatch<React.SetStateAction<any[]>> }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormInputs>();
    const [files, setFiles] = useState<File[]>([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const user = useAppSelector((state: RootState) => state.auth.data);
    const vendor = useAppSelector((state: RootState) => state.vendor.data);
    const dispatch = useAppDispatch();

    const [previewImages, setPreviewImages] = useState<any[]>([]);

    const handleFileChange = (e: any) => {
        const files = e.target.files as File[];
        if (files.length > 0) {
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

    const handleDrop = (e: any) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        handleFileChange(files);
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
    };

    //! TODO: IBAHIN NA YUNG APPROACH SA ERROR MESSAGE, TANGGALIN YUNG REQUIRED SA REACH HOOK FORM, AT MANU MANUHIN I ECHECK EMPTY
    const onSubmit = (data: IFormInputs) => {
        if (files.length <= 0 || !data.itemDesc || !data.itemStock || !data.itemPrice || !data.itemName || !selectedOption) {
            return toast.error("Fill up all fields", { duration: 2000 })
        }

        if (files.length <= 4) {
            setSubmitting(true)
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append("images", files[i])
            }

            formData.append("itemName", data.itemName);
            formData.append("itemDesc", data.itemDesc);
            formData.append("itemCategory", selectedOption);
            formData.append("itemPrice", data.itemPrice.toString());
            formData.append("itemStock", data.itemStock.toString());
            formData.append("vendorID", vendor?._id as string);

            const newItem = {
                itemName: data.itemName,
                itemDesc: data.itemDesc,
                itemCategory: selectedOption,
                itemPrice: data.itemPrice,
                itemStock: data.itemStock,
                vendorID: vendor?._id as string,
            };

            setPreviewImages([])

            // Update items state with the new item object
            setItems((prevItems: any[]) => ([...prevItems, newItem]));

            setTimeout(() => {
                setSubmitting(false);
                toast.success("Item added successfully", { duration: 2000 })
                reset();
                setSelectedOption("");
                dispatch(addItem(formData));
            }, 2000)
        }
    }

    const handleSelectChange = (event: string) => {
        setSelectedOption(event);
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add an Item</DialogTitle>
            </DialogHeader>

            <Separator />

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

                <div className="flex flex-col w-full">
                    <label className="text-sm max-w-max" htmlFor="itemName">Item Name</label>
                    <Input id="itemName" type="text" className={`${errors.itemName && "border-destructive"}`} {...register("itemName")} placeholder='min. 2, max. 80 characters' />
                    {errors.itemName && <p className='text-sm text-destructive font-medium' >{errors.itemName.message}</p>}
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-sm max-w-max" htmlFor="itemDesc">Item Description</label>
                    <Input id="itemDesc" type="text" className={`${errors.itemDesc && "border-destructive"}`} {...register("itemDesc")} placeholder='min. 2, max. 80 characters' />
                    {errors.itemDesc && <p className='text-sm text-destructive font-medium'>{errors.itemDesc.message}</p>}
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-sm max-w-max" htmlFor="itemCategory">Item Category</label>
                    <Select onValueChange={(e: any) => handleSelectChange(e)} defaultValue='' >
                        <SelectTrigger id='itemCategory'>
                            <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map(item => (
                                <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-sm max-w-max" htmlFor="images">Item Images</label>

                    <label
                        htmlFor='images'
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className={`flex flex-col items-center justify-center w-full rounded cursor-pointer bg-secondary hover:bg-secondary/90`}>
                        {
                            previewImages.length > 0 ?
                                <div className='flex items-center gap-4 overflow-auto'>
                                    {previewImages.map((imageDataURL, index) => (
                                        <img
                                            key={index}
                                            src={imageDataURL}
                                            alt={`Preview ${index + 1}`}
                                            className='w-full h-56 '
                                        />
                                    ))}
                                </div>
                                :
                                <>
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloudIcon size={24} />
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Upload PNG, JPEG, or JPG images (MAX. 4, MIN. 2MB <em>each</em>)</p>
                                    </div>
                                </>
                        }

                        <Input id="images" type="file" className='hidden' accept="image/jpeg, image/png" {...register("images")} onChange={(e) => {
                            setFiles(Array.from(e.target.files || []))
                            handleFileChange(e)
                        }} multiple />
                    </label>
                </div>

                {files && files.length >= 5 ? <p className='text-sm font-medium text-destructive'>4 images only</p> : null}

                <div className="flex flex-col w-full">
                    <label className="text-sm max-w-max" htmlFor="itemPrice">Item Price</label>
                    <Input
                        id="itemPrice"
                        type="text"
                        className={`${errors.itemName && "border-destructive"}`}
                        {...register("itemPrice", {
                            // pattern: {
                            //     value: /^(?:[1-9]\d*|0)?(?:\.\d{1,2})?$/,
                            //     message: "Please enter a valid number."
                            // },
                            // min: {
                            //     value: 1,
                            //     message: "Please enter a value greater than 0."
                            // }
                        })}
                    />
                    {errors.itemPrice && <p className='text-sm text-destructive font-medium'>{errors.itemPrice.message}</p>}
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-sm max-w-max" htmlFor="itemStock">Item Quantity</label>
                    <Input
                        className={`${errors.itemName && "border-destructive"}`}
                        id="itemStock"
                        type="text"
                        {...register("itemStock", {

                            // pattern: {
                            //     value: /^[1-9]\d*$/,
                            //     message: "Please enter a valid number."
                            // },
                            // min: {
                            //     value: 1,
                            //     message: "Please enter a value greater than 0."
                            // }
                        })}
                    />
                    {errors.itemStock && <p className='text-sm text-destructive font-medium'>{errors.itemStock.message}</p>}
                </div>

                <div className='flex items-center justify-end gap-4'>
                    <DialogClose className='bg-transparent border p-2 px-4 rounded hover:bg-secondary/70' onClick={() => {
                        reset();
                        setPreviewImages([]);
                        setSelectedOption("");
                    }}>
                        Cancel
                    </DialogClose>
                    <Button className="max-w-max" type="submit" disabled={submitting}>Add Item</Button>
                </div>
            </form>
        </DialogContent >
    )
}

export default AddItemModal