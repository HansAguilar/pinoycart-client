import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { useState } from "react"
import SellerSideBar from "@/components/SellerSideBar";
import SellerProfile from "@/components/SellerProfile";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import SellerItems from "@/components/SellerItems";

const Seller = () => {
    const user = useAppSelector((state: RootState) => state.auth.data);
    const [vendorData, setVendorData] = useState<string | boolean>(user?.role === "vendor" || false);

    return (
        <main className="flex container m-auto flex-col gap-4 w-full">
            {
                vendorData  ?
                    <Tabs defaultValue="profile" className="py-8 flex gap-4 w-full">
                        <SellerSideBar />

                        <TabsContent value="profile" className="w-full">
                            <SellerProfile />
                        </TabsContent>
                        <TabsContent value="items" className="w-full">
                            <SellerItems />
                        </TabsContent>
                    </Tabs>
                    :
                    <>
                        <h2>You are not a seller. Click <span className="font-medium underline">Start Selling</span> to become a seller.</h2>
                        <Button className="max-w-max" onClick={() => setVendorData(true)}>Start Selling</Button>
                    </>
            }
        </main>
    )
}

export default Seller