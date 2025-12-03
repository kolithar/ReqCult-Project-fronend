import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useAuthContext();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(form.email, form.password);
            navigate("/dashboard");
        } catch (err: any) {
            alert(err.message || "Login failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form className="space-y-3" onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" className="border p-2 w-full" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input type="password" placeholder="Password" className="border p-2 w-full" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
            </form>
        </div>
    );
}
