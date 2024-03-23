import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react"
import { Toaster } from "@/components/ui/sonner";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import UserProfile from "../components/UserProfile";
import { Separator } from "@/components/ui/separator";

const privateLinks = [
    { to: "/settings/selleritems", title: "Items" },
]

const Settings = () => {
    const user = useAppSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("/settings");
    const [vendorData, setVendorData] = useState<string | boolean>(false);

    useEffect(() => {
        if (!user.isLogged) {
            navigate('/challenge');
        }

        else {
            if (user.data?.role === "vendor") {
                setVendorData(true)
            }
        }
    }, [])

    return (
        <main className="flex container m-auto flex-col gap-4 w-full my-8 py-4">
            <div>
                <h4 className="text-2xl font-bold">Settings</h4>
                <p>Manage your account settings and set e-mail preferences.</p>
            </div>

            <Separator />

            <div className="flex max-lg:flex-col">
                <div className="max-w-max flex flex-col max-lg:flex-row max-lg:pb-4 items-start w-full">
                    <NavLink to="/settings" className={`${activeTab === "/settings" ? "bg-secondary" : ""} rounded px-4 py-2 w-52 max-lg:w-auto font-medium text-sm`} onClick={() => setActiveTab("/settings")}>
                        User
                    </NavLink>
                    <NavLink to="/settings/createseller" className={`${activeTab === "/settings/createseller" ? "bg-secondary" : ""} rounded px-4 py-2 w-52 max-lg:w-auto font-medium text-sm`} onClick={() => setActiveTab("/settings/createseller")}>
                        Seller
                    </NavLink>

                    {
                        vendorData &&
                        privateLinks.map(link => (
                            <NavLink key={link.to} to={link.to} className={`${activeTab === link.to ? "bg-secondary" : ""} rounded px-4 py-2 w-52 max-lg:w-auto font-medium text-sm`} onClick={() => setActiveTab(link.to)}>
                                {link.title}
                            </NavLink>
                        ))
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