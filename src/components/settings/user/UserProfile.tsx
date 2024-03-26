import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as z from "zod"
import { AlertDialog, AlertDialogTrigger } from "../../ui/alert-dialog"
import ChangePasswordModal from "./ChangePasswordModal"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip"
import { Edit2 } from "lucide-react"
import { Card } from "../../ui/card"
import { editUser, verifyToken } from "@/store/features/auth/authSlice"
import { toast } from "sonner"

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
    const dispatch = useAppDispatch();

    const [editUsername, setEditUsername] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>();

    function onSubmit(data: ProfileFormValues) {
        if (data.username) {
            dispatch(editUser({ userID: user.data?._id!, username: data.username }))
            toast.success("Username successfully updated", { duration: 2000 })
            setEditUsername(false)
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (!user.isLogged) {
            navigate("/challenge")
        }
    }, [])

    return (
        <AlertDialog>
            <main className="flex m-auto flex-col gap-4 w-full">

                <ChangePasswordModal />

                <div className="flex flex-col w-2/3 px-4 max-lg:p-0 max-lg:w-full">
                    <div className="py-2">
                        <h3 className="text-lg font-medium">Profile</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            This is how others will see you on the site.
                        </p>
                    </div>
                    <Separator />
                    <form onSubmit={handleSubmit(onSubmit)} className="pt-4 flex flex-col gap-4">
                        {
                            !editUsername
                                ?
                                <div className="flex justify-between">
                                    <p className='font-medium text-sm'>Username: <span className="text-primary">{user.data?.username}</span></p>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Edit2 className='h-4 w-4' onClick={() => setEditUsername(true)} />
                                            </TooltipTrigger>
                                            <TooltipContent className='bg-secondary'>
                                                <p>Edit</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                :
                                <Card className="flex flex-col rounded p-4 gap-8">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="vendorName" className="font-medium text-sm">Username</label>
                                        <div className="flex flex-col w-full">
                                            <Input id="vendorName" type="text" className="w-full" autoFocus {...register("username", { required: true, maxLength: 20, minLength: 2 })} defaultValue={user.data?.username} />
                                            {errors.username && <p className="text-[0.8rem] font-medium text-destructive">Username must be at least 2 characters.</p>}
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-4'>
                                        {
                                            editUsername && <Button className="max-w-max" variant="secondary" onClick={() => setEditUsername(false)}>Cancel</Button>
                                        }
                                        <Button type="submit" className="max-w-max">Save Changes</Button>
                                    </div>
                                </Card>
                        }

                        <AlertDialogTrigger asChild className="mt-8">
                            <Button className="max-w-max" variant="outline">Change Password</Button>
                        </AlertDialogTrigger>
                    </form>
                </div>
            </main>
        </AlertDialog>
    )
}