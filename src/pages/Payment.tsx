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
        <div className="p-6 max-w-md mx-auto mt-8">
            <div className="bg-white rounded-lg shadow-2xl border-4 border-yellow-400 p-8">
                <h2 className="text-3xl font-bold text-black mb-2">Payment</h2>
                <p className="text-lg text-gray-700 mb-2">Product: <span className="font-semibold text-yellow-600">{product.name}</span></p>
                {product.price && (
                    <p className="text-2xl font-bold text-yellow-600 mb-6">Total: ${product.price.toFixed(2)}</p>
                )}
                {err && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg border-2 border-red-400">{err}</div>}
                <form onSubmit={submit} className="flex flex-col gap-4">
                    <input value={card} onChange={e=>setCard(e.target.value)} placeholder="Card number" className="border-2 border-yellow-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-black" />
                    <input value={expiry} onChange={e=>setExpiry(e.target.value)} placeholder="MM/YY" className="border-2 border-yellow-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-black" />
                    <input value={cvv} onChange={e=>setCvv(e.target.value)} placeholder="CVV" className="border-2 border-yellow-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-black" />
                    <button className="bg-yellow-400 text-black p-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg">Pay Now</button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
