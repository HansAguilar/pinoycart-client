import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Separator } from '../../ui/separator';
import { UpdateVendor, UpdateVendorBanner, createVendor, fetchVendorInfo } from '@/store/features/vendor/vendorSlice';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import join from "../../../assets/ask.png"
import { Edit2, Upload, } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Card } from '../../ui/card';

interface IFormInputs {
    vendorName: string;
    vendorDesc: string;
    image?: FileList;
}

const MAX_FILE_SIZE = 1000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const CreateSeller = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>();
    const dispatch = useAppDispatch();
    const vendor = useAppSelector((state: RootState) => state.vendor);
    const user = useAppSelector((state: RootState) => state.auth);

    const [file, setFile] = useState("");
    const [errorImg, setErrorImg] = useState("");
    const [imageSend, setImageSend] = useState<any>();
    const [showForm, setShowForm] = useState<boolean>(user.data?.vendorInfo ? true : false);

    const [editUserInfo, setEditUserInfo] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.isLogged) {
            navigate("/challenge")
        }

        else {
            dispatch(fetchVendorInfo(user.data?.vendorInfo!))
        }
    }, [])

    const onSubmit = (data: IFormInputs) => {
        if (user?.data?.role === "customer") {
            const formData = new FormData();
            formData.append("vendorName", data.vendorName)
            formData.append("vendorDesc", data.vendorDesc)
            formData.append("image", imageSend)
            formData.append("userID", user.data?._id as string)
            dispatch(createVendor(formData))
            toast.success("Seller created successfully", { duration: 2000 })
        }

        else {
            dispatch(UpdateVendor({ vendorName: data.vendorName, vendorDesc: data.vendorDesc, vendorID: vendor.data?._id! }))
            toast.success("Updated successfully", { duration: 2000 })
        }
    }

    function handleChange(e: any) {
        const uploadedFile: File = e.target.files[0];

        if (uploadedFile.size <= MAX_FILE_SIZE) {
            return setErrorImg("Max image size is 5MB");
        }

        else if (!ACCEPTED_IMAGE_TYPES.includes(uploadedFile.type)) {
            return setErrorImg("Only .jpg, .jpeg, .png and .webp formats are supported.")
        }

        setFile(URL.createObjectURL(uploadedFile));
        if (user.data?.role === "vendor") {
            dispatch(UpdateVendorBanner({ image: uploadedFile, vendorID: vendor.data?._id! }))
            toast.success("Updated profile successfully", { duration: 2000 })
        }

        else {
            setErrorImg("")
            setImageSend(uploadedFile)
            setFile(URL.createObjectURL(uploadedFile));
        }
    }

    return (
        <main className="flex m-auto flex-col gap-4 w-full">
            <div className="flex flex-col w-2/3 px-4 max-lg:p-0 max-lg:w-full">
                {
                    showForm ?
                        <>
                            <div className="py-2">
                                <h3 className="text-lg font-medium">Vendor</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    This is how others will see you on the site.
                                </p>
                            </div>
                            <Separator />

                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="image" className="font-medium text-sm">Seller Profile</label>
                                    <Avatar className="rounded-none w-full h-[250px] relative">
                                        <AvatarImage src={file ? file : `http://localhost:3000/uploads/${vendor.data?.vendorBanner}`} className="w-full rounded-none object-cover aspect-auto" />
                                        <AvatarFallback className="rounded-none">:)</AvatarFallback>
                                        <Input id="image" type="file" {...register("image")} accept='image/*' onChange={handleChange} className="pointer-events-none w-full h-full hidden" />
                                        <label htmlFor="image" className='absolute p-2 cursor-pointer right-0 top-0 bg-secondary/60'><Upload className='h-4 w-4' /></label>
                                    </Avatar>
                                    <p className="text-[0.8rem] font-medium text-destructive">{errorImg}</p>
                                </div>

                                {
                                    !editUserInfo
                                        ?
                                        <div className="flex my-4 justify-between items-center">
                                            <div className='flex gap-4'>
                                                <p className='font-medium text-sm'>Seller Name: <span className="text-primary">{vendor.data?.vendorName}</span></p>
                                                <p className='font-medium text-sm'>Seller Description: <span className="text-primary">{vendor.data?.vendorDesc}</span></p>
                                            </div>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Edit2 className='h-4 w-4' onClick={() => setEditUserInfo(true)} />
                                                    </TooltipTrigger>
                                                    <TooltipContent className='bg-secondary'>
                                                        <p>Edit</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                        :
                                        <Card className="flex flex-col rounded p-4 gap-8">
                                            <div className='flex flex-col gap-2'>
                                                <div className="flex flex-col gap-2">
                                                    <label htmlFor="vendorName" className="font-medium text-sm">Seller Name</label>
                                                    <div className="flex flex-col w-3/4">
                                                        <Input id="vendorName" type="text" {...register("vendorName", { required: true, maxLength: 80, minLength: 2 })} defaultValue={vendor.data?.vendorName} />
                                                        {errors.vendorName && <p className="text-[0.8rem] font-medium text-destructive">Seller name must be at least 2 characters.</p>}
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <label htmlFor="vendorDesc" className="font-medium text-sm">Seller Description</label>
                                                    <div className="flex flex-col w-3/4">
                                                        <Textarea id="vendorDesc" {...register("vendorDesc", { required: true, maxLength: 80, minLength: 2 })} defaultValue={vendor.data?.vendorDesc} className="resize-none" />
                                                        {errors.vendorDesc && <p className="text-[0.8rem] font-medium text-destructive">Seller description must be at least 2 characters.</p>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='flex items-center gap-4'>
                                                {
                                                    user?.data?.role === "vendor" && <Button className="max-w-max" variant="secondary" onClick={() => setEditUserInfo(false)}>Cancel</Button>
                                                }
                                                <Button className="max-w-max" type="submit">
                                                    {
                                                        user?.data?.role === "vendor"
                                                            ?
                                                            "Save changes"
                                                            :
                                                            "Create account"
                                                    }
                                                </Button>
                                            </div>
                                        </Card>
                                }
                            </form>
                        </>
                        :
                        <div className='w-full flex flex-col items-center justify-center gap-2'>
                            <img src={join} className='w-52 h-48' />
                            <p className='text-gray-500 text-sm font-medium'>Ready to start selling? Join our community of sellers today!</p>
                            <Button className='max-w-max' onClick={() => setShowForm(true)}>Create an account</Button>
                        </div>
                }
            </div>
        </main>
    )
}

export default CreateSeller