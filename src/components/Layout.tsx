import Content from '@/pages/Content'
import Header from './Header'
import { Route, Routes } from 'react-router-dom'
import UserProfile from '@/pages/UserProfile'
import Seller from '@/pages/Seller'
import ItemPage from './ItemPage'
import { Toaster } from "@/components/ui/sonner"

const Layout = () => {
    return (
        <div className='flex flex-col h-screen'>
             
            <Header />
            <div className='flex-1 w-full'>
                <Routes>
                    <Route path="/items" index element={<Content />} />
                    <Route path="/items/:id" element={<ItemPage />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/seller" element={<Seller />} />
                </Routes>
            </div>
            <Toaster richColors  />
        </div>
    )
}

export default Layout