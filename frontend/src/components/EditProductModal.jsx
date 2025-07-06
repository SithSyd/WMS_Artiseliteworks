import { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditProductModal({ product, onClose, onUpdated }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm(product);
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`inventory/${product.id}/`, form);
      onUpdated();
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input name="name" value={form.name || ''} onChange={handleChange} placeholder="Name" className="border p-2 rounded" />
          <input name="sku" value={form.sku || ''} onChange={handleChange} placeholder="SKU" className="border p-2 rounded" />
          <input name="tags" value={form.tags || ''} onChange={handleChange} placeholder="Tags" className="border p-2 rounded" />
          <input name="category" value={form.category || ''} onChange={handleChange} placeholder="Category" className="border p-2 rounded" />
          <input name="quantity" type="number" value={form.quantity || ''} onChange={handleChange} placeholder="Quantity" className="border p-2 rounded" />
          <input name="low_stock_threshold" type="number" value={form.low_stock_threshold || ''} onChange={handleChange} placeholder="Low Stock" className="border p-2 rounded" />
          <textarea name="description" value={form.description || ''} onChange={handleChange} placeholder="Description" className="col-span-2 border p-2 rounded" rows="3" />
          <div className="col-span-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
