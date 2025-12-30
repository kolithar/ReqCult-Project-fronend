import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { ProductCard } from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { useNavigate } from 'react-router-dom';

const Custom: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>(null);
    const [selectedAlcohol, setSelectedAlcohol] = useState<string>('');
    const nav = useNavigate();

    useEffect(()=> {
        (async ()=> {
            const res = await API.get('/products?category=custom');
            setProducts(res.data);
        })();
    }, []);

    const buy = () => {
        nav('/payment', { state: { product: selected, selectedAlcohol } });
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl">Custom</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {products.map(p => <ProductCard key={p._id} product={p} onClick={setSelected} />)}
            </div>
            {selected && <ProductModal product={selected} onClose={()=>setSelected(null)} onBuy={buy} onSelectAlcohol={setSelectedAlcohol} />}
        </div>
    );
};

export default Custom;
