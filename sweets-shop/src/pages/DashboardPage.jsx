import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useSweets } from "../hooks/useSweets";
import { Header } from "../components/layout/Header";
import { SweetsList } from "../components/sweets/SweetsList";
import { SweetForm } from "../components/sweets/SweetForm";
import { Spinner } from "../components/common/Spinner";
import { Notification } from "../components/common/Notification";
import { FilterBar } from "../components/sweets/FilterBar";

export const DashboardPage = () => {
  const { user } = useAuth();
  const {
    sweets,
    loading: sweetsLoading,
    error: sweetsError,
    addSweet,
    updateSweet,
    removeSweet,
    purchaseSweet,
    searchSweets,
    refreshSweets,
  } = useSweets();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handlePurchase = async (id) => {
    try {
      await purchaseSweet(id);
      showNotification("Purchase successful!");
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;
    try {
      await removeSweet(id);
      showNotification("Sweet deleted successfully!");
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  const handleEdit = (sweet) => {
    setEditingSweet(sweet);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingSweet) {
        await updateSweet(editingSweet._id, formData);
        showNotification("Sweet updated successfully!");
      } else {
        await addSweet(formData);
        showNotification("Sweet added successfully!");
      }
      setIsModalOpen(false);
      setEditingSweet(null);
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  const handleSearch = async () => {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== "")
    );

    if (Object.keys(activeFilters).length > 0) {
      await searchSweets(activeFilters);
    } else {
      refreshSweets();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="bg-white/15 p-6 rounded-xl shadow-sm mb-8">
          <FilterBar filters={filters} setFilters={setFilters} onSearch={handleSearch} />
          {user.role === "admin" && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer bg-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-600"
              >
                + Add Sweet
              </button>
            </div>
          )}
        </div>

        {sweetsLoading && (
          <div className="flex justify-center mt-8">
            <Spinner />
          </div>
        )}
        {sweetsError && (
          <p className="text-center text-red-500">{sweetsError}</p>
        )}
        {!sweetsLoading && !sweetsError && (
          <SweetsList
            sweets={sweets}
            user={user}
            onPurchase={handlePurchase}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>

      <SweetForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSweet(null);
        }}
        onSubmit={handleFormSubmit}
        sweet={editingSweet}
      />
      <Notification message={notification.message} type={notification.type} />
    </div>
  );
};
