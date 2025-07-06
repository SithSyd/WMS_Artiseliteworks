import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Inventory from './pages/Inventory';
import Inbound from './pages/Inbound';
import Outbound from './pages/Outbound';
import AddProduct from './pages/AddProduct';
import DashboardLayout from './components/DashboardLayout';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="add-product" element={<AddProduct />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="inbound" element={<Inbound />} />
          <Route path="outbound" element={<Outbound />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
