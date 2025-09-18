import React from 'react';

export const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-gray-200 rounded-lg p-8 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-6">{title}</h2>
                {children}
            </div>
        </div>
    );
};
