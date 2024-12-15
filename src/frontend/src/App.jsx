import React from "react";
import Employee from "./admin/pages/Employee/Employee.jsx";
import Menu from "./admin/pages/Menu/Menu.jsx";
import Customer from "./admin/pages/Customer/Customer.jsx";
import Bill from "./admin/pages/Bill/Bill/Bill.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BillDetail from "./admin/pages/Bill/Bill/BillDetail.jsx";
import Table from "./admin/pages/Table/Table.jsx";
import TableDetail from "./admin/pages/Table/TableDetail.jsx";
import Reservation from "./admin/pages/Reservation/Reservation.jsx";
import Dashboard from "./admin/pages/Dashboard/Dashboard.jsx";
import RegionalMenu from "./admin/pages/RegionalMenu/RegionalMenu.jsx";
import Order from "./admin/pages/Table/Order/Order.jsx";
import AdminLogin from "./admin/pages/Login.jsx";
import ProtectedRoutes from "./admin/routes/ProtectedRoutes.jsx";
import CompanyCustomer from "./admin/boss/pages/CompanyCustomer/CompanyCustomer.jsx";
import CompanyMenu from "./admin/boss/pages/CompanyMenu/CompanyMenu.jsx";
import CompanyDashboard from "./admin/boss/pages/CompanyDashboard/CompanyDashboard.jsx";
import CompanyEmployee from "./admin/boss/pages/CompanyEmployee/CompanyEmployee.jsx";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Category from "./pages/Category";
import CustomerReservation from "./pages/Reservation.jsx";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <>
              <Header />
              <Product />
              <Footer />
            </>
          }
        />
        <Route
          path="/cart-page"
          element={
            <>
              <Header />
              <Cart />
              <Footer />
            </>
          }
        />
        <Route
          path="/customer-reservation"
          element={
            <>
              <Header />
              <CustomerReservation />
              <Footer />
            </>
          }
        />
        <Route
          path="/menu"
          element={
            <>
              <Header />
              <Category />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Header />
              <Signup />
              <Footer />
            </>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoutes roleRequired={["staff", "admin", "boss"]} />
          }
        >
          <Route path="/table" element={<Table />} />
          <Route path="/table/:tableID" element={<TableDetail />} />
          <Route path="/table/:tableID/order" element={<Order />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/bill/:billID" element={<BillDetail />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/menu" element={<Menu />} />
        </Route>

        <Route
          path="/"
          element={<ProtectedRoutes roleRequired={["admin", "boss"]} />}
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/regional-menu" element={<RegionalMenu />} />
        </Route>

        <Route path="/" element={<ProtectedRoutes roleRequired={["boss"]} />}>
          <Route path="/company-dashboard" element={<CompanyDashboard />} />
          <Route path="/company-employee" element={<CompanyEmployee />} />
          <Route path="/company-menu" element={<CompanyMenu />} />
          <Route path="/company-customer" element={<CompanyCustomer />} />
        </Route>

        <Route
          path="/admin/login"
          element={
            <>
              <AdminLogin />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
