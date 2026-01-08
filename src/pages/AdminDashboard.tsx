import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import AdminProductForm from '../components/AdminProductForm';
import SearchInput from '../components/SearchInput';

const AdminDashboard: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const fetchAll = async () => {
        const params = new URLSearchParams();
        if (searchQuery.trim()) {
            params.append('search', searchQuery.trim());
        }
        const [pRes, oRes] = await Promise.all([
            API.get(`/products?${params.toString()}`), 
            API.get('/orders')
        ]);
        setProducts(pRes.data);
        setOrders(oRes.data);
    };

    useEffect(()=> { fetchAll(); }, [searchQuery]);

    const handleDelete = async (id: string) => {
        if (!confirm('Delete product?')) return;
        await API.delete(`/products/${id}`);
        fetchAll();
    };

    const handleToggleFamous = async (id: string, currentStatus: boolean) => {
        await API.put(`/products/${id}`, { isFamous: !currentStatus });
        fetchAll();
    };

    const handleUpdatePrice = async (id: string, newPrice: string) => {
        const priceValue = newPrice ? parseFloat(newPrice) : undefined;
        await API.put(`/products/${id}`, { price: priceValue });
        fetchAll();
    };

    const downloadOrdersPDF = async () => {
        const res = await API.get('/pdf/orders', {
            responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'all-orders.pdf';
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-black mb-6">Admin Panel</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                <div className="lg:col-span-1">
                    <AdminProductForm onCreated={fetchAll} />
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white rounded-lg shadow-lg border-4 border-yellow-400 p-6">
                        <h3 className="text-2xl font-bold text-black mb-4">Products</h3>
                        <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search products by name, description, or ingredients..." />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            {products.map(p => (
                                <div key={p._id} className="bg-white border-2 border-yellow-400 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <img src={p.image} alt={p.name} className="h-36 w-full object-cover rounded-lg" />
                                    <div className="mt-3">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold text-black">{p.name}</h4>
                                                <p className="text-sm text-gray-600">{p.category}</p>
                                                {p.isFamous && <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded font-semibold mt-1 inline-block">⭐ Famous</span>}
                                            </div>
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={()=>handleToggleFamous(p._id, p.isFamous || false)} 
                                                    className={`px-3 py-1 rounded-lg text-white font-semibold ${p.isFamous ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'bg-gray-600 hover:bg-gray-700'}`}
                                                >
                                                    {p.isFamous ? '⭐' : '⭐'}
                                                </button>
                                                <button onClick={()=>handleDelete(p._id)} className="px-3 py-1 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">Delete</button>
                                            </div>
                                        </div>
                                        <div className="mt-3 pt-3 border-t-2 border-yellow-200">
                                            <label className="block text-sm font-semibold text-black mb-1">Price ($)</label>
                                            <div className="flex gap-2">
                                                <input 
                                                    type="number" 
                                                    step="0.01" 
                                                    min="0" 
                                                    defaultValue={p.price || ''} 
                                                    onBlur={(e) => {
                                                        if (e.target.value !== (p.price?.toString() || '')) {
                                                            handleUpdatePrice(p._id, e.target.value);
                                                        }
                                                    }}
                                                    className="flex-1 border-2 border-yellow-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-black"
                                                    placeholder="0.00"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white rounded-lg shadow-lg border-4 border-yellow-400 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-black">Orders</h3>

                            <button
                                onClick={downloadOrdersPDF}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
                            >
                                Download Orders PDF
                            </button>
                        </div>

                        <div className="mt-2 overflow-x-auto">
                            <table className="w-full table-auto border-2 border-yellow-400">
                                <thead className="bg-yellow-400">
                                <tr>
                                    <th className="p-3 border-2 border-yellow-600 text-black font-bold">User</th>
                                    <th className="p-3 border-2 border-yellow-600 text-black font-bold">Product</th>
                                    <th className="p-3 border-2 border-yellow-600 text-black font-bold">Amount</th>
                                    <th className="p-3 border-2 border-yellow-600 text-black font-bold">Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map(o => (
                                    <tr key={o._id} className="border-t-2 border-yellow-400 hover:bg-yellow-50">
                                        <td className="p-3 border-2 border-yellow-400 text-black">
                                            {o.userId?.email}
                                        </td>
                                        <td className="p-3 border-2 border-yellow-400 text-black font-semibold">
                                            {o.productId?.name}
                                        </td>
                                        <td className="p-3 border-2 border-yellow-400 text-black font-bold text-yellow-600">
                                            ${o.totalAmount}
                                        </td>
                                        <td className="p-3 border-2 border-yellow-400 text-black">
                                            {new Date(o.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
