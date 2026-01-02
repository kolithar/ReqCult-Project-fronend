import React from 'react';

interface Props { product: any; onClick: (p: any) => void; }
export const ProductCard: React.FC<Props> = ({ product, onClick }) => {
    return (
        <div className="bg-white border-2 border-yellow-400 rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300" onClick={() => onClick(product)}>
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4 bg-gradient-to-b from-white to-yellow-50">
                <h3 className="font-bold text-lg text-black">{product.name}</h3>
            </div>
        </div>
    );
};
