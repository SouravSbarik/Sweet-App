// src/components/FilterBar.jsx
import React from "react";

export const FilterBar = ({ filters, setFilters, onSearch }) => {
    return (
        <div className="bg-gray-200/80 p-6 rounded-xl shadow-sm mb-8 grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Name Search */}
            <input
                type="text"
                placeholder="Search by name"
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                className="p-2 border rounded-md"
            />

            {/* Category */}
            <input
                type="text"
                placeholder="Search by category"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="p-2 border rounded-md"
            />


            {/* Min Price */}
            <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className="p-2 border rounded-md"
            />

            {/* Max Price */}
            <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="p-2 border rounded-md"
            />

            {/* Search Button */}
            <button
                onClick={onSearch}
                className="bg-pink-700 cursor-pointer text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-600"
            >
                Search
            </button>
        </div>
    );
};
