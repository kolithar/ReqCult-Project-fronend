import React, { useState } from 'react';
import API from '../api/axios';

const AdminProductForm: React.FC<{ onCreated: ()=>void }> = ({ onCreated }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState<'juice'|'cocktail'|'custom'>('juice');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [alcoholBrands, setAlcoholBrands] = useState('');
    const [isFamous, setIsFamous] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await API.post('/products', {
            name, image, category, description,
            ingredients: ingredients.split(',').map(s=>s.trim()).filter(Boolean),
            alcoholBrands: alcoholBrands.split(',').map(s=>s.trim()).filter(Boolean),
            isFamous
        });
        setName(''); setImage(''); setDescription(''); setIngredients(''); setAlcoholBrands(''); setIsFamous(false);
        onCreated();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white border-4 border-yellow-400 p-6 rounded-lg shadow-lg space-y-4">
            <h3 className="text-2xl font-bold text-black mb-4">Add Product</h3>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full border-2 border-yellow-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-black" />
            <input value={image} onChange={e=>setImage(e.target.value)} placeholder="Image URL" className="w-full border-2 border-yellow-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-black" />
            <select value={category} onChange={e=>setCategory(e.target.value as any)} className="w-full border-2 border-yellow-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-black">
                <option value="juice">Juice</option>
                <option value="cocktail">Cocktail</option>
                <option value="custom">Custom</option>
            </select>
            <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full border-2 border-yellow-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-black" />
            <input value={ingredients} onChange={e=>setIngredients(e.target.value)} placeholder="Ingredients (comma separated)" className="w-full border-2 border-yellow-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-black" />
            <input value={alcoholBrands} onChange={e=>setAlcoholBrands(e.target.value)} placeholder="Alcohol brands (comma separated, for custom)" className="w-full border-2 border-yellow-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-black" />
            <label className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                <input type="checkbox" checked={isFamous} onChange={e=>setIsFamous(e.target.checked)} className="w-5 h-5 text-yellow-400 focus:ring-yellow-400" />
                <span className="font-semibold text-black">Mark as Famous Item</span>
            </label>
            <button className="bg-yellow-400 text-black px-4 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg w-full">Create Product</button>
        </form>
    );
};

export default AdminProductForm;
