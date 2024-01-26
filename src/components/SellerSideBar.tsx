import { TabsList, TabsTrigger } from "@/components/ui/tabs"

const SellerSideBar = () => {
    return (
        <TabsList className='flex flex-col gap-2 p-10 w-80'>
            <TabsTrigger value="profile" className="justify-start">Profile</TabsTrigger>
            <TabsTrigger value="items" className="justify-start">Items</TabsTrigger>
        </TabsList>
    )
}

export default SellerSideBar