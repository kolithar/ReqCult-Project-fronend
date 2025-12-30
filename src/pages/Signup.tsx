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
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl mb-4">Signup</h2>
            {err && <div className="bg-red-100 text-red-700 p-2 mb-2 rounded">{err}</div>}
            <form onSubmit={submit} className="flex flex-col gap-2">
                <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" className="border p-2" />
                <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="border p-2" />
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="border p-2" />
                <button className="bg-green-600 text-white p-2 rounded">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
