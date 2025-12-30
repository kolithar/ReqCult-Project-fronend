import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Payment: React.FC = () => {
    const { state }: any = useLocation();
    const { product, selectedAlcohol } = state || {};
    const [card, setCard] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const navigate = useNavigate();
    const [err, setErr] = useState<string | null>(null);

    if (!product) return <div className="p-4">No product selected</div>;

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErr(null);
        try {
            const res = await API.post('/orders', {
                productId: product._id,
                category: product.category,
                selectedAlcohol: selectedAlcohol || null,
                totalAmount: product.price || 5.99 // if no price saved, use sample amount
            });
            navigate('/slip', { state: { order: res.data } });
        } catch (e:any) {
            setErr(e.response?.data?.message || 'Payment failed');
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl">Payment — {product.name}</h2>
            {err && <div className="bg-red-100 text-red-700 p-2 mt-2 rounded">{err}</div>}
            <form onSubmit={submit} className="flex flex-col gap-2 mt-4">
                <input value={card} onChange={e=>setCard(e.target.value)} placeholder="Card number" className="border p-2" />
                <input value={expiry} onChange={e=>setExpiry(e.target.value)} placeholder="MM/YY" className="border p-2" />
                <input value={cvv} onChange={e=>setCvv(e.target.value)} placeholder="CVV" className="border p-2" />
                <button className="bg-blue-600 text-white p-2 rounded">Pay</button>
            </form>
        </div>
    );
};

export default Payment;
