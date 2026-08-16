import { BrowserRouter, Routes, Route } from 'react-router'
import UserLayout from './components/Layout/UserLayout'
import {Toaster} from 'sonner'
import Login from './components/Pages/Login'
import Home from './components/Pages/Home'
import Register from './components/Pages/Register'
import Profile from './components/Pages/Profile'
import CollectionPage from './components/Pages/CollectionPage'
import AMPCollectionPage from './components/Pages/AMPCollectionPage'
import ProductDetailPage from './components/Pages/ProductDetailsPage'


const App = () => {
  return (
    <BrowserRouter>
      <Toaster position='top-right' />
      <Routes>
          <Route path='/' element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='profile' element={<Profile />} />
          <Route path='collections/guitars' element={<CollectionPage />} />
          <Route path='collections/amp' element={<AMPCollectionPage />} />
          <Route path='collections/:collection' element={<CollectionPage />} />
          <Route path='product/:productId' element={<ProductDetailPage />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App