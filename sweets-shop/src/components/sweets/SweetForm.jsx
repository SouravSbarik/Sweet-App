import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';

export const SweetForm = ({ isOpen, onClose, onSubmit, sweet }) => {
    const [formData, setFormData] = useState({ name: '', category: '', price: '', quantity: '' });

    useEffect(() => {
        if (sweet) {
            setFormData({ name: sweet.name, category: sweet.category, price: sweet.price, quantity: sweet.quantity });
        } else {
            setFormData({ name: '', category: '', price: '', quantity: '' });
        }
    }, [sweet, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submittedData = {
            ...formData,
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity, 10),
        };
        onSubmit(submittedData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={sweet ? 'Edit Sweet' : 'Add New Sweet'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded" required />
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required step="0.01" min="0" />
                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" className="w-full p-2 border rounded" required min="0" />
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 cursor-pointer rounded hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-pink-500 text-white rounded cursor-pointer hover:bg-pink-600">{sweet ? 'Update' : 'Add'}</button>
                </div>
            </form>
        </Modal>
    );
};
