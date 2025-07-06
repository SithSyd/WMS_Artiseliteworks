import { useState } from 'react';
import axios from 'axios';

export default function AddProductForm({ onProductAdded }) {
  const [form, setForm] = useState({
    name: '',
    sku: '',
    tags: '',
    description: '',
    category: '',
    quantity: '',
    low_stock_threshold: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('inventory/', {
        ...form,
        is_archived: false,
      });

      if (onProductAdded) onProductAdded(res.data);
      setForm({
        name: '',
        sku: '',
        tags: '',
        description: '',
        category: '',
        quantity: '',
        low_stock_threshold: '',
      });
    } catch (err) {
      console.error("Add product error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
      <div className="grid grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" required />
        <input name="sku" value={form.sku} onChange={handleChange} placeholder="SKU" className="border p-2 rounded" required />
        <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags" className="border p-2 rounded" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border p-2 rounded" />
        <input name="quantity" type="number" value={form.quantity} onChange={handleChange} placeholder="Quantity" className="border p-2 rounded" required />
        <input name="low_stock_threshold" type="number" value={form.low_stock_threshold} onChange={handleChange} placeholder="Low Stock Threshold" className="border p-2 rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="col-span-2 border p-2 rounded" rows="3" />
      </div>
      <button type="submit" className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Add Product</button>
    </form>
  );
}
