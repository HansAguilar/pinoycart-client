import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateItem } from "@/store/features/items/itemSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { UploadCloudIcon } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

export type IFormInputs = {
    itemID: string;
    itemName: string;
    itemDesc: string;
    itemCategory: string;
    itemPrice: number;
    itemStock: number;
    images: File[];
}

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

export const EditModal = ({ selectedItem, setAction, dispatch, items, setItems }: { selectedItem: any, setAction: any, dispatch: any, items: any, setItems: any }) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm<IFormInputs>();

    const vendor = useAppSelector((state: RootState) => state.vendor.data);

    const [files, setFiles] = useState<any>();
    const [selectedOption, setSelectedOption] = useState("");
    const [previewImages, setPreviewImages] = useState(selectedItem?.itemImages || []);
    const [localImage, setLocalImage] = useState<boolean>(false);

    const [imageError, setImageError] = useState("");

    const onSubmit = (data: any) => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("images", files[i])
        }

        formData.append("vendorID", vendor?._id!);
        formData.append("itemID", selectedItem?._id!);
        formData.append("itemName", data.itemName);
        formData.append("itemDesc", data.itemDesc);
        formData.append("itemCategory", selectedOption);
        formData.append("itemPrice", data.itemPrice);
        formData.append("itemStock", data.itemStock);

        // Update items state with the edited item
        const updatedItems = items.map((item: any) => {
            if (item.itemID === selectedItem?._id) {
                // Update the item with edited data
                return {
                    ...item,
                    itemName: data.itemName,
                    itemDesc: data.itemDesc,
                    itemCategory: selectedOption,
                    itemPrice: data.itemPrice,
                    itemStock: data.itemStock,
                    // Add other properties as needed
                };
            }
            return item; // Return unchanged item if not the selected one
        });

        setItems(updatedItems);
        toast.success("Item Updated Successfully", { duration: 1000 })
        dispatch(updateItem(formData))
        setTimeout(() => {
            window.location.reload();
        }, 1000)
    };

    const handleSelectChange = (event: string) => {
        setSelectedOption(event);
    };

    const handleFileChange = (e: any) => {
        const files = e.target.files as File[];
        const maxSizeInBytes = 2 * 1024 * 1024; // 2MB

        if (files.length > 0 && files.length <= 4) {
            const isFileSizeValid = Array.from(files).every((file) => file.size <= maxSizeInBytes);
            if (isFileSizeValid) {
                setLocalImage(true);
                const imageFiles = Array.from(files).filter((file: any) => file.type.startsWith('image/'));
                Promise.all(imageFiles.map(fileToDataURL)).then((imageDataURLs: any[]) => {
                    setPreviewImages(imageDataURLs);
                });
            }
            else {
                setImageError("Each image must be smaller than 2MB.");
            }
        }

        else if (files.length > 4) {
            setImageError("You can only upload a maximum of 4 images.");
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

    useEffect(() => {
        setPreviewImages(selectedItem.itemImages);
        setFiles(selectedItem.itemImages);
    }, [])

    return (
        <AlertDialogContent className="min-h-[80%] h-[80%] overflow-auto w-11/12">
            <AlertDialogHeader>
                <AlertDialogTitle>Edit <span className="text-primary">{selectedItem?.itemName}?</span> </AlertDialogTitle>
            </AlertDialogHeader>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col w-full">
                    <label className="text-sm max-w-max" htmlFor="itemName">Item Name</label>
                    <Input id="itemName" className={`${errors.itemName && "border-destructive"}`} type="text" {...register("itemName", { required: "This field is required", maxLength: 80, minLength: 2 })} defaultValue={selectedItem?.itemName} />
                    {errors.itemName && <p className='text-sm text-destructive font-medium'>{errors.itemName.message}</p>}
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-sm max-w-max" htmlFor="itemDesc">Item Description</label>
                    <Input id="itemDesc" className={`${errors.itemDesc && "border-destructive"}`} type="text" {...register("itemDesc", { required: "This field is required", maxLength: 80, minLength: 2 })} defaultValue={selectedItem?.itemDesc} />
                    {errors.itemDesc && <p className='text-sm text-destructive font-medium'>{errors.itemDesc.message}</p>}
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-sm max-w-max" htmlFor="itemCategory">Item Category</label>
                    <Select name='itemCategory' defaultValue={selectedItem?.itemCategory} onValueChange={(e: any) => handleSelectChange(e)}>
                        <SelectTrigger className="">
                            <SelectValue id='itemCategory' placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map(item => (
                                <SelectItem id='itemCategory' key={item.value} value={item.value}>{item.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {!selectedItem?.itemCategory && <p className='text-sm text-destructive'>This field is required</p>}
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-sm max-w-max" htmlFor="images">Item Images</label>
                    <label
                        htmlFor='images'
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className="flex flex-col items-center justify-center w-full rounded cursor-pointer bg-secondary hover:bg-secondary-foreground/10">
                        {
                            previewImages?.length > 0 ?
                                <div className='flex items-center gap-4 overflow-auto'>
                                    {previewImages?.map((imageDataURL: string, index: number) => (
                                        <img
                                            key={index}
                                            src={!localImage ? `http://localhost:3000/uploads/${imageDataURL}` : imageDataURL}
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
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 5 Images)</p>
                                    </div>
                                </>
                        }

                        <Input id="images" type="file" className='hidden' accept="image/jpeg, image/png" {...register("images")} onChange={(e) => {
                            setFiles(e.target.files)
                            handleFileChange(e)
                        }} multiple />
                    </label>
                    {imageError && <p className="text-sm text-destructive font-medium">{imageError}</p>}
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-sm max-w-max" htmlFor="itemPrice">Item Price</label>
                    <Input
                        id="itemPrice"
                        type="text"
                        className={`${errors.itemName && "border-destructive"}`}
                        {...register("itemPrice", {
                            required: "This field is required",
                            pattern: {
                                value: /^(?:[1-9]\d*|0)?(?:\.\d{1,2})?$/,
                                message: "Please enter a valid number."
                            },
                            min: {
                                value: 1,
                                message: "Please enter a value greater than 0."
                            }
                        })}
                        defaultValue={selectedItem?.itemPrice}
                    />
                    {errors.itemPrice && <p className='text-sm text-destructive font-medium'>{errors.itemPrice.message}</p>}
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-sm max-w-max" htmlFor="itemQuantity">Item Quantity</label>
                    <Input
                        className={`${errors.itemName && "border-destructive"}`}
                        id="itemQuantity"
                        type="text"
                        {...register("itemStock", {
                            required: "This field is required",
                            pattern: {
                                value: /^[1-9]\d*$/,
                                message: "Please enter a valid number."
                            },
                            min: {
                                value: 1,
                                message: "Please enter a value greater than 0."
                            }
                        })}
                        defaultValue={selectedItem?.itemStock}
                    />
                    {errors.itemStock && <p className='text-sm text-destructive font-medium'>{errors.itemStock.message}</p>}
                </div>

                <AlertDialogFooter className="flex items-center flex-row justify-center">
                    <AlertDialogCancel className="max-w-max" onClick={() => {
                        setAction("");
                        setImageError("");
                        reset()
                    }}>Cancel</AlertDialogCancel>
                    <Button className="max-w-max px-2">Save Changes</Button>
                </AlertDialogFooter>
            </form>
        </AlertDialogContent>
    )
}