import React from 'react';
import { SweetCard } from './SweetCard';

export const SweetsList = ({ sweets, ...props }) => {
    if (sweets.length === 0) {
        return <p className="text-center text-gray-500 col-span-full">No sweets found. Try adjusting your search!</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sweets.map((sweet) => (
                <SweetCard key={sweet._id} sweet={sweet} {...props} />
            ))}
        </div>
    );
};
