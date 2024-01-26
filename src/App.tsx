import './App.css'
import { ThemeProvider } from "@/components/ui/theme-provider"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Authentication from './pages/Authentication'
import PrivateRoutes from './components/PrivateRoutes'
import Layout from './components/Layout'
import Feed from './components/Feed'
import UserProfile from './pages/UserProfile'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route element={<Authentication />} path='/' />
          <Route element={<PrivateRoutes />}>
            <Route path="/user/*" element={<Layout />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider >
  )
}

export default App
