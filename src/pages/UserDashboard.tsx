import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { ProductCard } from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { useNavigate } from 'react-router-dom';

const UserDashboard: React.FC = () => {
    const [famousProducts, setFamousProducts] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>(null);
    const [selectedAlcohol, setSelectedAlcohol] = useState<string>('');
    const nav = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const res = await API.get('/products?isFamous=true');
                setFamousProducts(res.data);
            } catch (err) {
                console.error('Failed to fetch famous products:', err);
            }
        })();
    }, []);

    const buy = () => {
        nav('/payment', { state: { product: selected, selectedAlcohol } });
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Welcome</h2>
            <p className="mt-2 mb-6">Select a category from the navbar to browse juices, cocktails or custom mixes.</p>
            
            {famousProducts.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <span>⭐</span>
                        <span>Famous Items</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {famousProducts.map(p => (
                            <ProductCard key={p._id} product={p} onClick={setSelected} />
                        ))}
                    </div>
                </div>
            )}
            
            {selected && (
                <ProductModal 
                    product={selected} 
                    onClose={() => setSelected(null)} 
                    onBuy={buy} 
                    onSelectAlcohol={setSelectedAlcohol} 
                />
            )}
        </div>
    );
};

export default UserDashboard;
