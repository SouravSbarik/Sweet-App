import React from 'react';
import { EditIcon, TrashIcon } from '../common/Icons';

export const SweetCard = ({ sweet, user, onPurchase, onEdit, onDelete }) => {
    const isOutOfStock = sweet.quantity === 0;

    return (
        <div className="bg-gray-200 rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
            <div className="p-6 flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="uppercase tracking-wide text-sm text-pink-500 font-semibold">{sweet.category}</div>
                        <h2 className="block mt-1 text-lg leading-tight font-bold text-black">{sweet.name}</h2>
                    </div>
                    {user?.role === 'admin' && (
                        <div className="flex space-x-2">
                            <button onClick={() => onEdit(sweet)} className="cursor-pointer text-gray-400 hover:text-blue-500"><EditIcon /></button>
                            <button onClick={() => onDelete(sweet._id)} className="cursor-pointer text-gray-400 hover:text-red-500"><TrashIcon /></button>
                        </div>
                    )}
                </div>
                <p className="mt-2 text-gray-500">In stock: <span className="font-medium text-gray-700">{sweet.quantity}</span></p>
                <p className="mt-2 text-2xl font-bold text-pink-600">₹{sweet.price.toFixed(2)}</p>
            </div>
            <div className="p-6 bg-gray-50">
                <button onClick={() => onPurchase(sweet._id)} disabled={isOutOfStock} className="w-full bg-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed">
                    {isOutOfStock ? 'Out of Stock' : 'Purchase'}
                </button>
            </div>
        </div>
    );
};
