import React from 'react';

interface Props { product: any; onClick: (p: any) => void; }
export const ProductCard: React.FC<Props> = ({ product, onClick }) => {
    return (
        <div className="border rounded overflow-hidden cursor-pointer" onClick={() => onClick(product)}>
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-2">
                <h3 className="font-semibold">{product.name}</h3>
            </div>
        </div>
    );
};
