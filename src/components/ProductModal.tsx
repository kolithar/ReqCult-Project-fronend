import React from 'react';



interface Props { product: any; onClose: ()=>void; onBuy: ()=>void; onSelectAlcohol?: (a:string)=>void }
const ProductModal: React.FC<Props> = ({ product, onClose, onBuy, onSelectAlcohol }) => {
    if (!product) return null;
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white w-[92%] sm:w-96 rounded-lg shadow-2xl border-4 border-yellow-400 p-6">
                <h2 className="text-2xl font-bold text-black mb-3">{product.name}</h2>
                {product.price && (
                    <p className="text-3xl font-bold text-yellow-600 mb-3">${product.price.toFixed(2)}</p>
                )}
                <p className="text-sm mt-2 text-gray-700">{product.description}</p>
                <p className="mt-3 text-sm font-semibold text-black">Ingredients: <span className="font-normal text-gray-600">{product.ingredients?.join(', ')}</span></p>

                {product.alcoholBrands?.length > 0 && (
                    <div className="mt-4">
                        <label className="block mb-2 font-semibold text-black">Choose alcohol</label>
                        <select onChange={(e)=>onSelectAlcohol && onSelectAlcohol(e.target.value)} className="w-full border-2 border-yellow-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-black">
                            <option value="">-- select --</option>
                            {product.alcoholBrands.map((b:string)=> <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                )}

                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="px-4 py-2 border-2 border-black rounded-lg font-semibold hover:bg-black hover:text-white transition-colors">Close</button>
                    <button onClick={onBuy} className="px-4 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition-colors shadow-lg">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
