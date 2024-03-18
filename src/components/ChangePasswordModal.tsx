import { useState } from "react";

// Assuming these are your styled components or components from a UI library
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

export default function ChangePasswordModal() {
    const [passwordForm, setPasswordForm] = useState({ newPass: "", confirmPass: "" });
    const [showError, setShowError] = useState("");

    const handlePasswordChange = (field: any, value: any) => {
        setPasswordForm(prev => ({ ...prev, [field]: value }));

        if (field === "confirmPass") {
            setShowError(passwordForm.newPass !== value ? "Passwords don't match" : "");
        }
    };

    return (
        <AlertDialogContent>
            <form>
                <AlertDialogHeader>
                    <AlertDialogTitle>Change Password</AlertDialogTitle>
                    <AlertDialogDescription>
                        Enter a new password below to change your password.
                    </AlertDialogDescription>

                    <div className="pt-8 flex flex-col gap-4">
                        <div className="flex flex-col w-full">
                            <label htmlFor="newPass">New Password</label>
                            <div className="flex flex-col">
                                <Input
                                    id="newPass"
                                    type="password"
                                    className="w-full"
                                    onChange={e => handlePasswordChange('newPass', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="confirmPass">Confirm Password</label>
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
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction type="submit" onClick={e => {
                        e.preventDefault();
                        if (passwordForm.newPass === passwordForm.confirmPass) {
                            // Submit form logic here
                        }
                    }}>
                        Change Password
                    </AlertDialogAction>
                </AlertDialogFooter>
            </form>
        </AlertDialogContent>
    );
}
