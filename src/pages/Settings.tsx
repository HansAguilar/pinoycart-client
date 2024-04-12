import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react"
import { Toaster } from "@/components/ui/sonner";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import UserProfile from "../components/settings/user/UserProfile";
import { Separator } from "@/components/ui/separator";
import { fetchVendorInfo } from "@/store/features/vendor/vendorSlice";
import { getUserByID } from "@/store/features/auth/authSlice";

const settingsLinks = [
    { to: "/settings", title: "User" },
    { to: "/settings/createseller", title: "Seller" },
    { to: "/settings/selleritems", title: "Items" },
];


const Settings = () => {
    const user = useAppSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("/settings");
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!user.isLogged) {
            navigate('/challenge');
        }

        // else {
        //     if (user.data?.role === "vendor") {
        //         dispatch(fetchVendorInfo(user.data?.vendorInfo!))
        //     }
        // }

        dispatch(getUserByID(user.data?._id!))
    }, [user.isLogged, user.data?.role])

    return (
        <main className="flex container m-auto flex-col gap-4 w-full my-16 py-8">
            <div>
                <h4 className="text-2xl font-bold">Settings</h4>
                <p className="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
            </div>

            <Separator />

            <div className="flex max-lg:flex-col">
                <div className="max-w-max flex flex-col max-lg:flex-row max-lg:pb-4 items-start w-full">
                    {
                        // Inside the `Settings` component
                        <div className="max-w-max flex flex-col max-lg:flex-row max-lg:pb-4 items-start w-full">
                            {settingsLinks.map(link => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    className={`${activeTab === link.to ? "bg-slate-700 text-white" : ""} rounded px-4 py-2 w-52 max-lg:w-auto font-semibold text-sm`}
                                    onClick={() => setActiveTab(link.to)}
                                >
                                    {link.title}
                                </NavLink>
                            ))}
                        </div>
                    }
                </div>

                <div className="w-full">
                    {
                        activeTab === "/settings"
                            ?
                            <UserProfile />
                            :
                            <Outlet />
                    }
                </div>
            </div>
            <Toaster />
        </main>
    )
}

export default Settings