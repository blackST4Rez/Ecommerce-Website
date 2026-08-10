import { BrowserRouter, Routes, Route } from 'react-router'
import UserLayout from './components/Layout/UserLayout'
import Home from './components/Pages/Home'
import {Toaster} from 'sonner'

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position='top-right' />
      <Routes>
        <Route path='/' element={<UserLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App