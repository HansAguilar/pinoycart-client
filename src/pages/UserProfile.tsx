import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useAppSelector } from "@/store/hooks"
import { RootState } from "@/store/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as z from "zod"

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
        <main className="flex container m-auto flex-col gap-4 w-full">
            <div className="py-8 flex flex-col w-full px-8">
                <div>
                    <h3 className="text-lg font-medium">Profile</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        This is how others will see you on the site.
                    </p>
                </div>
                <Separator />
                <form onSubmit={handleSubmit(onSubmit)} className="pt-8">
                    <div className="flex items-center gap-4">
                        <label htmlFor="vendorName">Username</label>
                        <div className="flex flex-col w-3/4">
                            <Input id="vendorName" type="text" {...register("username", { required: true, maxLength: 20, minLength: 2 })} defaultValue={user.data?.username} />
                            {errors.username && <p className="text-[0.8rem] font-medium text-destructive">Username must be at least 2 characters.</p>}
                        </div>
                    </div>
                    <Button type="submit" className="mt-4">Save Changes</Button>
                </form>
            </div>
        </main>
    )
}