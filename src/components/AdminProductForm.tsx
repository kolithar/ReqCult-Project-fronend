import React, { useState } from 'react';
import API from '../api/axios';

const AdminProductForm: React.FC<{ onCreated: ()=>void }> = ({ onCreated }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState<'juice'|'cocktail'|'custom'>('juice');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [alcoholBrands, setAlcoholBrands] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await API.post('/products', {
            name, image, category, description,
            ingredients: ingredients.split(',').map(s=>s.trim()).filter(Boolean),
            alcoholBrands: alcoholBrands.split(',').map(s=>s.trim()).filter(Boolean)
        });
        setName(''); setImage(''); setDescription(''); setIngredients(''); setAlcoholBrands('');
        onCreated();
    };

    return (
        <form onSubmit={handleSubmit} className="border p-4 rounded space-y-2">
            <h3 className="font-semibold">Add Product</h3>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full border p-2" />
            <input value={image} onChange={e=>setImage(e.target.value)} placeholder="Image URL" className="w-full border p-2" />
            <select value={category} onChange={e=>setCategory(e.target.value as any)} className="w-full border p-2">
                <option value="juice">Juice</option>
                <option value="cocktail">Cocktail</option>
                <option value="custom">Custom</option>
            </select>
            <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full border p-2" />
            <input value={ingredients} onChange={e=>setIngredients(e.target.value)} placeholder="Ingredients (comma separated)" className="w-full border p-2" />
            <input value={alcoholBrands} onChange={e=>setAlcoholBrands(e.target.value)} placeholder="Alcohol brands (comma separated, for custom)" className="w-full border p-2" />
            <button className="bg-blue-600 text-white px-3 py-2 rounded">Create</button>
        </form>
    );
};

export default AdminProductForm;
