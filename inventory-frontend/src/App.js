import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import ForgotPassword from "./page/ForgotPassword";
import PrivateRoutes from "./components/Private/PrivateRoute";
import Layout from "./components/common/Layout";
import Overview from "./page/Overview";
import Home from "./page/Home";
import Analytics from "./page/Analytics";
import Reports from "./page/Reports";
import Companies from "./page/Companies";
import Regions from "./page/Regions";
import Branches from "./page/Branches";
import PageNotFound from "./page/PageNotFound";
import Products from "./page/Products";
import Customers from "./page/Customers";
import Salesman from "./page/Salesman";
import Suppliers from "./page/Suppliers";
import ProductCategories from "./page/ProductCategories";
import Brands from "./page/Brands";
import Users from "./page/Users";
import Purchases from "./page/Purchases";

const App = () => {
  return (
    <Router>
      <div className="w-full min-h-screen max-h-full flex">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Layout />} >
               <Route path="/" element={<Home />} />
               <Route path="/overview" element={<Overview />} />
               <Route path="/Analytics" element={<Analytics />} />
               <Route path="/Reports" element={<Reports />} />
               <Route path="/Companies" element={<Companies />} />
               <Route path="/Regions" element={<Regions />} />
               <Route path="/Branches" element={<Branches />} />
               <Route path="/Products" element={<Products />} />
               <Route path="/Customers" element={<Customers />} />
               <Route path="/Salesman" element={<Salesman />} />
               <Route path="/Suppliers" element={<Suppliers />} />
               <Route path="/Users" element={<Users />} />
               <Route path="/productCategories" element={<ProductCategories />} />
               <Route path="/Brands" element={<Brands />} />
               <Route path="/Purchases" element={<Purchases />} />
               <Route path="/*" element={<PageNotFound />} />
            </Route>
            
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
