import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();
    const [err, setErr] = useState<string | null>(null);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErr(null);
        try {
            await API.post('/auth/signup', { username, email, password });
            nav('/login');
        } catch (e:any) {
            setErr(e.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto mt-8">
            <div className="bg-white rounded-lg shadow-2xl border-4 border-yellow-400 p-8">
                <h2 className="text-3xl font-bold text-black mb-6 text-center">Signup</h2>
                {err && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg border-2 border-red-400">{err}</div>}
                <form onSubmit={submit} className="flex flex-col gap-4">
                    <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" className="border-2 border-yellow-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-black" />
                    <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="border-2 border-yellow-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-black" />
                    <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="border-2 border-yellow-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-black" />
                    <button className="bg-yellow-400 text-black p-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg">Signup</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
