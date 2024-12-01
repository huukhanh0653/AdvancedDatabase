import React from 'react';
import Employee from './admin/pages/Employee/Employee.jsx'
import Menu from './admin/pages/Menu/Menu.jsx'
import Customer from './admin/pages/Customer/Customer.jsx'
import Bill from './admin/pages/Bill/Bill/Bill.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BillDetail from './admin/pages/Bill/Bill/BillDetail.jsx'
import Table from './admin/pages/Table/Table.jsx'
import TableDetail from './admin/pages/Table/TableDetail.jsx'
import Reservation from './admin/pages/Reservation/Reservation.jsx'
import Dashboard from './admin/pages/Dashboard/Dashboard.jsx'
import RegionalMenu from './admin/pages/RegionalMenu/RegionalMenu.jsx';
import Order from './admin/pages/Table/Order/Order.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Reservation/>}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/table" element={<Table />}/>
          <Route path="/table/:tableID" element={<TableDetail />}/>
          <Route path="/table/:tableID/order" element={<Order />}/>
          <Route path="/reservation" element={<Reservation />}/>
          <Route path="/bill" element={<Bill />}/>
          <Route path="/bill/:billID" element={<BillDetail />}/>
          <Route path="/employee" element={<Employee />}/>
          <Route path="/menu" element={<Menu />}/>
          <Route path="/regional-menu" element={<RegionalMenu />}/>
          <Route path="/customer" element={<Customer />}/>    
      </Routes>
    </BrowserRouter>
  )
}