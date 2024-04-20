import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Purchases from "./pages/Purchases";
import Header from "./components/Header";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Cart from "./cart/Cart";
import Signup from "./pages/Signup";
import ErrorMesage from "./components/error/ErrorMesage";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <main className="min-h-screen overflow-hidden">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/purchases" element={<Purchases />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <ErrorMesage />

        <Cart />
      </main>
      <Footer />
    </>
  );
}

export default App;
