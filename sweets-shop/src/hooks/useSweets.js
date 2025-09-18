import { useState, useCallback, useEffect } from 'react';
import * as api from '../api/sweetApi';

export const useSweets = () => {
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refreshSweets = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await api.fetchSweets();
            setSweets(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);
    
    useEffect(() => {
        refreshSweets();
    }, [refreshSweets]);

    const addSweet = async (sweetData) => {
        const data = await api.createSweet(sweetData);
        setSweets(prev => [...prev, data]);
    };

    const updateSweet = async (id, sweetData) => {
        const updatedSweet = await api.updateSweet(id, sweetData);
        setSweets(prev => prev.map(s => (s._id === id ? updatedSweet : s)));
    };
    
    const removeSweet = async (id) => {
        await api.deleteSweet(id);
        setSweets(prev => prev.filter(s => s._id !== id));
    };

    const purchaseSweet = async (id) => {
        const { sweet: updatedSweet } = await api.purchaseSweet(id);
        setSweets(prev => prev.map(s => (s._id === id ? updatedSweet : s)));
    };

    const searchSweets = async (params) => {
        try {
          setLoading(true);
          setError(null);
          const data = await api.searchSweets(params);
          setSweets(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

    return {searchSweets, sweets, loading, error, addSweet, updateSweet, removeSweet, purchaseSweet, refreshSweets };
};
