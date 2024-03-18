import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Separator } from './ui/separator';
import { createVendor, fetchVendorInfo } from '@/store/features/vendor/vendorSlice';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

interface IFormInputs {
    vendorName: string;
    vendorDesc: string;
    image: FileList;
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

    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.isLogged) {
            navigate("/challenge")
        }
    }, [])

    const onSubmit = (data: any) => {
        const formData = new FormData();
        formData.append("vendorName", data.vendorName)
        formData.append("vendorDesc", data.vendorDesc)
        formData.append("image", imageSend)
        formData.append("userID", user.data?._id as string)
        // dispatch(createVendor(formData))
        console.log(Object.keys(formData))
        toast.success("Seller created successfully", { duration: 2000 })
    }

    function handleChange(e: any) {

    }

    useEffect(() => {
        dispatch(fetchVendorInfo(user?.data?.vendorInfo!))
    }, [])

    return (
        <main className="flex container m-auto flex-col gap-4 w-full">

            <div className="flex flex-col w-10/12 px-8">
                <div>
                    <h3 className="text-lg font-medium">Profile</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        This is how others will see you on the site.
                    </p>
                </div>
                <Separator />
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
                    <div className="flex flex-col gap-2 relative">
                        <label htmlFor="image">Seller Banner</label>
                        <Avatar className="h-36 w-full rounded-none">
                            <AvatarImage src={file ? file : `http://localhost:3000/uploads/${vendor.data?.vendorBanner}`} className=" w-full rounded-none object-contain aspect-auto" />
                            <AvatarFallback className="rounded-none">CN</AvatarFallback>
                            <Input id="image" type="file" {...register("image")} onChange={handleChange} className="pointer-events-none w-full h-full hidden" />
                        </Avatar>
                        <p className="text-[0.8rem] font-medium text-destructive">{errorImg}</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <label htmlFor="vendorName">Seller Name</label>
                        <div className="flex flex-col w-3/4">
                            <Input id="vendorName" type="text" {...register("vendorName", { required: true, maxLength: 80, minLength: 2 })} defaultValue={vendor.data?.vendorName} />
                            {errors.vendorName && <p className="text-[0.8rem] font-medium text-destructive">Seller name must be at least 2 characters.</p>}
                        </div>

                    </div>

                    <div className="flex items-center justify-between">
                        <label htmlFor="vendorDesc">Seller Description</label>
                        <div className="flex flex-col w-3/4">
                            <Textarea id="vendorDesc" {...register("vendorDesc", { required: true, maxLength: 80, minLength: 2 })} defaultValue={vendor.data?.vendorDesc} className="resize-none" />
                            {errors.vendorDesc && <p className="text-[0.8rem] font-medium text-destructive">Seller description must be at least 2 characters.</p>}
                        </div>
                    </div>

                    <Button className="max-w-max" type="submit">
                        {
                            user?.data?.role === "vendor"
                                ?
                                "Save changes"
                                :
                                "Create account"
                        }
                    </Button>
                </form>
            </div>
        </main>
    )
}

export default CreateSeller