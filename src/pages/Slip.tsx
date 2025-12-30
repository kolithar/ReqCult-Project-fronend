import React from 'react';
import { useLocation } from 'react-router-dom';

const Slip: React.FC = () => {
    const { state }: any = useLocation();
    const order = state?.order;
    if (!order) return <div className="p-4">No order data</div>;

    return (
        <div className="p-4 max-w-lg mx-auto border rounded">
            <h2 className="text-2xl mb-2">Payment Slip</h2>
            <p><strong>Transaction:</strong> {order.transactionId}</p>
            <p><strong>Product:</strong> {order.productId?.name}</p>
            <p><strong>Amount:</strong> {order.totalAmount}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        </div>
    );
};

export default Slip;
