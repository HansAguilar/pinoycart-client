import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Separator } from "./ui/separator";
import SellerTable from "./SellerTable";
import { toast } from "sonner";
import AddItemModal from "./AddItemModal";
import { Dialog, DialogTrigger } from "./ui/dialog";


const SellerItems = () => {
    // const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>();
    // const [files, setFiles] = useState<any>();
    // const dispatch = useAppDispatch();
    // const user = useAppSelector((state: RootState) => state.auth.data)

    // const onSubmit = (data: any) => {
    //     const formData = new FormData();
    //     for (let i = 0; i < files.length; i++) {
    //         formData.append("images", files[i])
    //     }

    //     formData.append("itemName", data.itemName);
    //     formData.append("itemDesc", data.itemDesc);
    //     formData.append("itemCategory", data.itemCategory);
    //     formData.append("itemPrice", data.itemPrice);
    //     formData.append("itemStock", data.itemStock);
    //     formData.append("userID", user?._id as string);
    //     dispatch(addItem(formData))
    //     toast.success("Item added successfully", { duration: 2000 })
    // }

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

                    <AddItemModal />

                    <Separator />

                    <DialogTrigger className="bg-secondary max-w-max p-2 font-medium text-sm">Add Item</DialogTrigger>

                    <SellerTable />
                </div>
            </main>
        </Dialog>
    )
}

export default SellerItems