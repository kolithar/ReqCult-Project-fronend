import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
//import FarmerPage from "../pages/FarmerPage";
//import MerchantPage from "../pages/MerchantPage";
//import AdminPanel from "../pages/AdminPanel";
//import {ProtectedRoute} from "../components/ProtectedRoute";
import {ProtectedRoute} from "../components/ProtectedRoute";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                {/* Redirect homepage to login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Public pages */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected pages */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                {/*{<Route path="/farmer" element={<ProtectedRoute allowedRoles={["farmer"]}><FarmerPage /></ProtectedRoute>} />}*/}
                {/*{<Route path="/merchant" element={<ProtectedRoute allowedRoles={["merchant"]}><MerchantPage /></ProtectedRoute>} />}*/}
                {/*{<Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminPanel /></ProtectedRoute>} />}*/}
            </Routes>
        </BrowserRouter>
    );
}
