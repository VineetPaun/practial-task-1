import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter,  Routes, Route } from "react-router";
import Signup from './components/Signup.tsx';
import Login from './components/Login.tsx';
import EditProfile from './components/EditProfile.tsx';
import ChangePassword from './components/ChangePassword.tsx';
import Products from './components/Products.tsx';
import ViewProduct from './components/ViewProduct.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/products" element={<Products />} />
      <Route path="/view-product" element={<ViewProduct />} />
    </Routes>
  </BrowserRouter>,
)
