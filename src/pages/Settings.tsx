import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react"
import { Toaster } from "@/components/ui/sonner";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import UserProfile from "../components/UserProfile";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const privateLinks = [
    { to: "/settings/sellerprofile", title: "Seller Profile" },
    { to: "/settings/selleritems", title: "Seller Items" },
]

const Settings = () => {
    const user = useAppSelector((state: RootState) => state.auth);
    const [vendorData, setVendorData] = useState<string | boolean>(user.data?.role === "vendor" || false);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("/settings");

    useEffect(() => {
        if (!user.isLogged) {
            navigate('/challenge');
        }
    }, [])

    return (
        <main className="flex container m-auto flex-col gap-4 w-full mt-8 py-4">
            <div>
                <h4 className="text-2xl font-bold">Settings</h4>
                <p>Manage your account settings and set e-mail preferences.</p>
            </div>

            <Separator />

            <div className="flex">
                <div className="max-w-max flex flex-col items-start w-full">
                    <NavLink to="/settings" className={`${activeTab === "/settings" ? "bg-secondary" : ""} px-4 py-2 w-52 font-medium text-sm`} onClick={() => setActiveTab("/settings")}>
                        User Profile
                    </NavLink>
                    <NavLink to="/settings/createseller" className={`${activeTab === "/settings/createseller" ? "bg-secondary" : ""} px-4 py-2 w-52 font-medium text-sm`} onClick={() => setActiveTab("/settings/createseller")}>
                        Become a Seller
                    </NavLink>

                    {
                        vendorData &&
                        privateLinks.map(link => (
                            <NavLink to={link.to} className={`${activeTab === link.to ? "bg-secondary" : ""} px-4 py-2 w-52 font-medium text-sm`} onClick={() => setActiveTab(link.to)}>
                                {link.title}
                            </NavLink>
                        ))
                    }
                </div>

                <div className="w-full">
                    {activeTab === "/settings" && <UserProfile />}
                    <Outlet />
                </div>
            </div>
            <Toaster />
        </main>
    )
}

export default Settings