import { createRoot } from "react-dom/client";
import "./styles/variables.css";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Signup from "./components/Signup.tsx";
import Login from "./components/Login.tsx";
import Profile from "./components/Profile.tsx";
import Products from "./components/Products.tsx";
import ViewProduct from "./components/ViewProduct.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/products" element={<Products />} />
      <Route path="/view-product" element={<ViewProduct />} />
    </Routes>
  </BrowserRouter>
);
