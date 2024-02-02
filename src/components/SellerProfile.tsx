import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UpdateVendor, UpdateVendorBanner, createVendor, fetchVendorInfo } from "@/store/features/vendor/vendorSlice";
import { toast } from "sonner"

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

    const onSubmit = (data: any) => {
        if (user?.role === "customer") {
            const formData = new FormData();
            formData.append("vendorName", data.vendorName)
            formData.append("vendorDesc", data.vendorDesc)
            formData.append("image", imageSend)
            dispatch(createVendor(formData))
        }

        else {
            const formData = new FormData();
            formData.append("vendorName", data.vendorName)
            formData.append("vendorDesc", data.vendorDesc)
            dispatch(UpdateVendor(data))
            toast.success("Successfully Updated", { duration: 2000 })
        }
    }

    const vendor = useAppSelector((state: RootState) => state.vendor.data);
    const user = useAppSelector((state: RootState) => state.auth.data);
    const apiState = useAppSelector((state: RootState) => state.items);

    const [file, setFile] = useState("");
    const [errorImg, setErrorImg] = useState("");
    const [imageSend, setImageSend] = useState<any>();

    function handleChange(e: any) {
        const uploadedFile: File = e.target.files[0];

        if (uploadedFile.size <= MAX_FILE_SIZE) {
            return setErrorImg("Max image size is 5MB");
        }

        else if (!ACCEPTED_IMAGE_TYPES.includes(uploadedFile.type)) {
            return setErrorImg("Only .jpg, .jpeg, .png and .webp formats are supported.")
        }

        else if (user?.role === "vendor") {
            const formData = new FormData();
            formData.append("image", uploadedFile)
            dispatch(UpdateVendorBanner(formData))
        }

        else {
            setErrorImg("")
            setImageSend(uploadedFile)
            setFile(URL.createObjectURL(uploadedFile));
        }
    }

    useEffect(() => {
        dispatch(fetchVendorInfo(user?.vendorInfo!))
    }, [])

    return (
        <>
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    This is how others will see you on the site.
                </p>
            </div>
            <Separator />
            <div className="max-w-2xl">
                {
                    user?.role === "vendor" &&
                    <div className="flex justify-between border p-2 bg-secondary mb-10">
                        <p>Seller Name: <span className="text-primary">{vendor?.vendorName}</span></p>
                        <p>Seller Description: <span className="text-primary">{vendor?.vendorDesc}</span></p>
                    </div>
                }

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 relative">
                        <label htmlFor="image">Seller Banner</label>
                        <Avatar className="h-36 w-full rounded-none">
                            <AvatarImage src={file ? file : `http://localhost:3000/uploads/${vendor?.vendorBanner}`} className=" w-full rounded-none object-fill aspect-auto" />
                            <AvatarFallback className="rounded-none">CN</AvatarFallback>
                            <Input id="image" type="file" {...register("image")} onChange={handleChange} className="pointer-events-none w-full h-full hidden" />
                        </Avatar>
                        <p className="text-[0.8rem] font-medium text-destructive">{errorImg}</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <label htmlFor="vendorName">Seller Name</label>
                        <div className="flex flex-col w-3/4">
                            <Input id="vendorName" type="text" {...register("vendorName", { required: true, maxLength: 80, minLength: 2 })} defaultValue={vendor?.vendorName} />
                            {errors.vendorName && <p className="text-[0.8rem] font-medium text-destructive">Seller name must be at least 2 characters.</p>}
                        </div>

                    </div>

                    <div className="flex items-center justify-between">
                        <label htmlFor="vendorDesc">Seller Description</label>
                        <div className="flex flex-col w-3/4">
                            <Textarea id="vendorDesc" {...register("vendorDesc", { required: true, maxLength: 80, minLength: 2 })} defaultValue={vendor?.vendorDesc} className="resize-none" />
                            {errors.vendorDesc && <p className="text-[0.8rem] font-medium text-destructive">Seller description must be at least 2 characters.</p>}
                        </div>
                    </div>

                    <Button className="max-w-max" type="submit">
                        {user?.role === "vendor" ? "Update" : "Save"} Changes
                    </Button>
                </form>
            </div >
        </>
    )
}

export default SellerProfile;
