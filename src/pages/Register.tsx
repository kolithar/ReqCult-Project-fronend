import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const { register } = useAuthContext();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "farmer" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await register(form);
        alert("Registered successfully. Please login.");
        navigate("/login");
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form className="space-y-3" onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" className="border p-2 w-full" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input type="email" placeholder="Email" className="border p-2 w-full" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input type="password" placeholder="Password" className="border p-2 w-full" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <select className="border p-2 w-full" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                    <option value="farmer">Farmer</option>
                    <option value="merchant">Merchant</option>
                </select>
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Register</button>
            </form>
        </div>
    );
}
