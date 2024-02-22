import Content from '@/pages/Content'
import Header from './Header'
import { Route, Routes } from 'react-router-dom'
import UserProfile from '@/pages/UserProfile'
import Seller from '@/pages/Seller'
import ItemPage from './ItemPage'
import { Toaster } from "@/components/ui/sonner"
import MIssing from './MIssing'

const Layout = () => {
    return (
        <div className='flex flex-col h-screen'>
            <Header />
            <div className='flex-1 w-full'>
                <Routes>
                    <Route path="/"  element={<Content />} />
                    <Route path="/item/:id" element={<ItemPage />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/seller" element={<Seller />} />
                    <Route path="/*" element={<MIssing />} />
                </Routes>
            </div>
            <Toaster richColors />
        </div>
    )
}

export default Layout