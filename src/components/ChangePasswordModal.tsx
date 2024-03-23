import { useState } from "react";
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changePassword } from "@/store/features/auth/authSlice";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangleIcon } from "lucide-react";

export default function ChangePasswordModal() {
    const [passwordForm, setPasswordForm] = useState({ newPass: "", confirmPass: "" });

    const user = useAppSelector(state => state.auth.data);
    const dispatch = useAppDispatch();
    const [showError, setShowError] = useState("");

    const handlePasswordChange = (field: any, value: any) => {
        setPasswordForm(prev => ({ ...prev, [field]: value }));

        if (field === "confirmPass") {
            setShowError(passwordForm.newPass !== value ? "Passwords don't match" : "");
        }
    };

    const handleCloseModal = () => {
        setPasswordForm(({ newPass: "", confirmPass: "" }))
        setShowError("")
    }

    return (
        <AlertDialogContent>
            <form>
                <AlertDialogHeader>
                    <AlertDialogTitle>Change Password</AlertDialogTitle>
                    <AlertDialogDescription>
                        Enter a new password below to change your password.
                    </AlertDialogDescription>

                    <div className="pt-8 flex flex-col gap-4">
                        <div className="flex flex-col w-full gap-2">
                            <label htmlFor="newPass" className="font-medium text-sm">New Password</label>
                            <div className="flex flex-col">
                                <Input
                                    id="newPass"
                                    type="password"
                                    className="w-full"
                                    onChange={e => handlePasswordChange('newPass', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <label htmlFor="confirmPass" className="font-medium text-sm">Confirm Password</label>
                            <div className="flex flex-col">
                                <Input
                                    id="confirmPass"
                                    type="password"
                                    className="w-full"
                                    onChange={e => handlePasswordChange('confirmPass', e.target.value)}
                                />
                                {showError && <p className="text-[0.8rem] font-medium text-destructive">{showError}</p>}
                            </div>
                        </div>
                    </div>
                </AlertDialogHeader>

                <AlertDialogFooter className="pt-8">
                    <AlertDialogCancel onClick={handleCloseModal}>Cancel</AlertDialogCancel>
                    <AlertDialogAction type="submit" onClick={e => {
                        if (!passwordForm.newPass || !passwordForm.confirmPass) {
                            e.preventDefault();
                            return toast.error("Please input all fields", { duration: 2000 })
                        }

                        else if (passwordForm.newPass !== passwordForm.confirmPass) {
                            e.preventDefault();
                            return toast.error("Passwords don't match", { duration: 2000 })
                        }

                        else {
                            dispatch(changePassword({
                                userID: user?._id!,
                                password: passwordForm.newPass
                            }))
                            toast.success("Password updated successfully", { duration: 2000 })
                            setPasswordForm(({ newPass: "", confirmPass: "" }))
                            setShowError("")
                        }
                    }}>
                        Change Password
                    </AlertDialogAction>
                </AlertDialogFooter>
            </form>
        </AlertDialogContent >
    );
}
