import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useAppSelector } from "@/store/hooks"
import { RootState } from "@/store/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as z from "zod"
import { AlertDialog, AlertDialogTrigger } from "./ui/alert-dialog"
import ChangePasswordModal from "./ChangePasswordModal"

const profileFormSchema = z.object({
    username: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
})

interface IFormInputs {
    username: string;
}

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function UserProfile() {
    const user = useAppSelector((state: RootState) => state.auth);

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>();

    function onSubmit(data: ProfileFormValues) {

    }

    const navigate = useNavigate();

    useEffect(() => {
        if (!user.isLogged) {
            navigate("/challenge")
        }
    }, [])

    return (
        <AlertDialog>
            <main className="flex container m-auto flex-col gap-4 w-full">

                <ChangePasswordModal />

                <div className="flex flex-col w-10/12 px-8">
                    <div>
                        <h3 className="text-lg font-medium">Profile</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            This is how others will see you on the site.
                        </p>
                    </div>
                    <Separator />
                    <form onSubmit={handleSubmit(onSubmit)} className="pt-4 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="vendorName">Username</label>
                            <div className="flex flex-col w-3/4">
                                <Input id="vendorName" type="text" {...register("username", { required: true, maxLength: 20, minLength: 2 })} defaultValue={user.data?.username} />
                                {errors.username && <p className="text-[0.8rem] font-medium text-destructive">Username must be at least 2 characters.</p>}
                            </div>
                        </div>

                        <AlertDialogTrigger asChild className="mt-8">
                            <Button className="max-w-max" variant="outline">Change Password</Button>
                        </AlertDialogTrigger>

                        <Button type="submit" className="mt-8 max-w-max">Update Username</Button>
                    </form>
                </div>
            </main>
        </AlertDialog>
    )
}