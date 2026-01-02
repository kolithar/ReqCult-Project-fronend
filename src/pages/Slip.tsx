import React from 'react';
import { useLocation } from 'react-router-dom';

const Slip: React.FC = () => {
    const { state }: any = useLocation();
    const order = state?.order;
    if (!order) return <div className="p-4">No order data</div>;

    return (
        <div className="p-6 max-w-lg mx-auto mt-8">
            <div className="bg-white rounded-lg shadow-2xl border-4 border-yellow-400 p-8">
                <h2 className="text-3xl font-bold text-black mb-6 text-center">Payment Slip</h2>
                <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                        <p className="text-sm text-gray-600">Transaction ID</p>
                        <p className="text-lg font-bold text-black">{order.transactionId}</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                        <p className="text-sm text-gray-600">Product</p>
                        <p className="text-lg font-bold text-black">{order.productId?.name}</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                        <p className="text-sm text-gray-600">Amount</p>
                        <p className="text-2xl font-bold text-yellow-600">${order.totalAmount}</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="text-lg font-semibold text-black">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slip;
