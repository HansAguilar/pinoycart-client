import Content from '@/pages/Content'
import Header from './Header'
import { Route, Routes } from 'react-router-dom'
import UserProfile from '@/components/settings/user/UserProfile'
import ItemPage from '../../pages/ItemPage'
import { Toaster } from "@/components/ui/sonner"
import MIssing from '../../pages/MIssing'
import Success from '../Success'
import Cancel from '../Cancel'
import Footer from './Footer'
import Settings from '@/pages/Settings'
import SellerProfile from '../settings/seller/SellerProfile'
import SellerItems from '../settings/seller/SellerItems'
import CreateSeller from '../settings/seller/CreateSeller'

const Layout = () => {
    return (
        <div className='flex flex-col h-screen'>
            <Header />
            <div className='flex-1 w-full'>
                <Routes>
                    <Route path="/" element={<Content />} />
                    <Route path="/item/:id" element={<ItemPage />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/cancel" element={<Cancel />} />
                    <Route path="/settings" element={<Settings />}>
                        <Route path="createseller" element={<CreateSeller />} />
                        <Route path="sellerprofile" element={<SellerProfile />} />
                        <Route path="selleritems" element={<SellerItems />} />
                    </Route>
                    <Route path="/*" element={<MIssing />} />
                </Routes>
            </div>
            <Footer />
            <Toaster richColors />
        </div>
    )
}

export default Layout