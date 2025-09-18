import React from 'react';

export const Notification = ({ message, type, onClose }) => {
    if (!message) return null;
    const baseClasses = "fixed bottom-5 right-5 p-4 rounded-lg text-white shadow-lg transition-opacity duration-300";
    const typeClasses = type === 'error' ? 'bg-red-500' : 'bg-green-500';

    return (
        <div className={`${baseClasses} ${typeClasses}`}>
            {message}
        </div>
    );
};
