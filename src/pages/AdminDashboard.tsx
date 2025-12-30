import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import AdminProductForm from '../components/AdminProductForm';

const AdminDashboard: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);

    const fetchAll = async () => {
        const [pRes, oRes] = await Promise.all([API.get('/products'), API.get('/orders')]);
        setProducts(pRes.data);
        setOrders(oRes.data);
    };

    useEffect(()=> { fetchAll(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Delete product?')) return;
        await API.delete(`/products/${id}`);
        fetchAll();
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl">Admin Panel</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                <div className="lg:col-span-1">
                    <AdminProductForm onCreated={fetchAll} />
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <section>
                        <h3 className="font-semibold">Products</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                            {products.map(p => (
                                <div key={p._id} className="border p-2 rounded">
                                    <img src={p.image} alt={p.name} className="h-36 w-full object-cover" />
                                    <div className="flex justify-between items-center mt-2">
                                        <div>
                                            <h4 className="font-semibold">{p.name}</h4>
                                            <p className="text-sm">{p.category}</p>
                                        </div>
                                        <div>
                                            <button onClick={()=>handleDelete(p._id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="font-semibold">Orders</h3>
                        <div className="mt-2 overflow-x-auto">
                            <table className="w-full table-auto border">
                                <thead className="bg-slate-100">
                                <tr>
                                    <th className="p-2 border">User</th>
                                    <th className="p-2 border">Product</th>
                                    <th className="p-2 border">Amount</th>
                                    <th className="p-2 border">Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map(o => (
                                    <tr key={o._id} className="border-t">
                                        <td className="p-2 border">{o.userId?.email}</td>
                                        <td className="p-2 border">{o.productId?.name}</td>
                                        <td className="p-2 border">{o.totalAmount}</td>
                                        <td className="p-2 border">{new Date(o.createdAt).toLocaleString()}</td>
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
