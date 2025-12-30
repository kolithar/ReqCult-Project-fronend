import React from 'react';



interface Props { product: any; onClose: ()=>void; onBuy: ()=>void; onSelectAlcohol?: (a:string)=>void }
const ProductModal: React.FC<Props> = ({ product, onClose, onBuy, onSelectAlcohol }) => {
    if (!product) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[92%] sm:w-96 rounded p-4">
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-sm mt-2">{product.description}</p>
                <p className="mt-2 text-sm">Ingredients: {product.ingredients?.join(', ')}</p>

                {product.alcoholBrands?.length > 0 && (
                    <div className="mt-3">
                        <label className="block mb-1">Choose alcohol</label>
                        <select onChange={(e)=>onSelectAlcohol && onSelectAlcohol(e.target.value)} className="w-full border p-2 rounded">
                            <option value="">-- select --</option>
                            {product.alcoholBrands.map((b:string)=> <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                )}

                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={onClose} className="px-3 py-1 border rounded">Close</button>
                    <button onClick={onBuy} className="px-3 py-1 bg-green-600 text-white rounded">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
