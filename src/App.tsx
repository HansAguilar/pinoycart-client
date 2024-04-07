import './App.css'
import { ThemeProvider } from "@/components/ui/theme-provider"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Authentication from './pages/Authentication'
import Layout from './components/layout/Layout'
import { Provider } from 'react-redux';
import { persistor, store } from './store/store'
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Router>
            <Routes>
              <Route path="/*" element={<Layout />} />
              <Route element={<Authentication />} path='/challenge' />
            </Routes>
          </Router>
        </ThemeProvider >
      </PersistGate>
    </Provider>
  )
}

export default App
