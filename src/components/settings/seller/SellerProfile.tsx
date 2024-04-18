import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UpdateVendor, UpdateVendorBanner, createVendor } from "@/store/features/vendor/vendorSlice";
import { toast } from "sonner"
import { useState } from "react";

interface IFormInputs {
    vendorName: string;
    vendorDesc: string;
    image: FileList;
}

const MAX_FILE_SIZE = 1000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const SellerProfile = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>();
    const dispatch = useAppDispatch();
    const vendor = useAppSelector((state: RootState) => state.vendor);
    const user = useAppSelector((state: RootState) => state.auth.data);

    const [file, setFile] = useState("");
    const [errorImg, setErrorImg] = useState("");
    const [imageSend, setImageSend] = useState<any>();

    const onSubmit = (data: any) => {
        // if (vendor.msg.includes("exists")) {
        //     return toast.error(vendor.msg, { duration: 2000 })
        // }
        if (user?.role === "customer") {
            const formData = new FormData();
            formData.append("vendorName", data.vendorName)
            formData.append("vendorDesc", data.vendorDesc)
            formData.append("image", imageSend)
            formData.append("userID", user._id)
            dispatch(createVendor(formData))
            toast.success("Seller created successfully", { duration: 2000 })
        }

        else {
            const formData = new FormData();
            formData.append("vendorName", data.vendorName)
            formData.append("vendorDesc", data.vendorDesc)
            formData.append("vendorID", vendor.data?._id!)
            dispatch(UpdateVendor(formData as any))
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
        if (user?.role === "vendor") {
            const formData = new FormData();
            formData.append("image", uploadedFile)
            dispatch(UpdateVendorBanner(formData as any))
        }

        else {
            setErrorImg("")
            setImageSend(uploadedFile)
            setFile(URL.createObjectURL(uploadedFile));
        }
    }

    return (
        <main className="flex container m-auto flex-col gap-4 w-full">
            <div className="w-10/12 px-8">
                <div>
                    <h3 className="text-lg font-medium">Profile</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        This is how others will see you on the site.
                    </p>
                </div>
                <Separator />
                <div>
                    {
                        user?.role === "vendor" &&
                        <div className="flex justify-between my-4">
                            <p>Seller Name: <span className="text-primary">{vendor.data?.vendorName}</span></p>
                            <p>Seller Description: <span className="text-primary">{vendor.data?.vendorDesc}</span></p>
                        </div>
                    }

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
                            <label htmlFor="vendorName">Seller Names</label>
                            <div className="flex flex-col w-3/4">
                                <Input id="vendorName" type="text" {...register("vendorName", { required: true, maxLength: 80, minLength: 2 })} defaultValue={vendor.data?.vendorName} disabled />
                                {errors.vendorName && <p className="text-[0.8rem] font-medium text-destructive">Seller name must be at least 2 characters.</p>}
                            </div>

                        </div>

                        <div className="flex items-center justify-between">
                            <label htmlFor="vendorDesc">Seller Description</label>
                            <div className="flex flex-col w-3/4">
                                <Textarea id="vendorDesc" {...register("vendorDesc", { required: true, maxLength: 80, minLength: 2 })} defaultValue={vendor.data?.vendorDesc} className="resize-none" disabled />
                                {errors.vendorDesc && <p className="text-[0.8rem] font-medium text-destructive">Seller description must be at least 2 characters.</p>}
                            </div>
                        </div>

                        <Button className="max-w-max" type="submit">
                            {
                                user?.role === "vendor"
                                    ?
                                    "Save changes"
                                    :
                                    "Create account"
                            }
                        </Button>
                    </form>

                </div>

                <Button>Create an account</Button>
            </div>
        </main>
    )
}

export default SellerProfile;
