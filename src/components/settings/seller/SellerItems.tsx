import { Separator } from "../../ui/separator";
import SellerTable from "./SellerTable";
import AddItemModal from "../items/AddItemModal";
import { Dialog } from "../../ui/dialog";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store/store";
import { fetchVendorInfo } from "@/store/features/vendor/vendorSlice";

interface IItem {
    _id: string;
    itemName: string;
    itemStock: number;
    itemDesc: string;
    itemPrice: number;
    itemCategory: string[];
    itemImages: string[]
}

const SellerItems = () => {
    const [items, setItems] = useState<IItem[]>([]); //! nandito ung items para ma share ung pag update sa table pag ka add sa modal
    const user = useAppSelector((state: RootState) => state.auth);
    const vendor = useAppSelector((state: RootState) => state.vendor);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.isLogged) {
            return navigate("/challenge")
        }

        dispatch(fetchVendorInfo(user.data?.vendorInfo!));
    }, [user])

    return (
        <Dialog>
            <main className="flex m-auto flex-col gap-4 w-full">

                <div className="flex flex-col w-2/3 px-4 max-lg:p-0 max-lg:w-full">
                    <div className="py-2">
                        <h3 className="text-lg font-medium">Items</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            This is where you can add and view items.
                        </p>
                    </div>

                    <Separator />

                    <AddItemModal items={items} setItems={setItems} />

                    <Separator />

                    <SellerTable items={items} setItems={setItems} />
                </div>
            </main>
        </Dialog>
    )
}

export default SellerItems