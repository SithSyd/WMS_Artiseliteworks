import { useState } from 'react';
import axios from 'axios';

export default function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    sku: '',
    tags: '',
    description: '',
    category: '',
    quantity: '',
    low_stock_threshold: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/inventory/', form);
      alert('✅ Product added successfully!');
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
      console.error('Error adding product:', err);
      alert('❌ Failed to add product.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-2 rounded"
          required
        />
        <input
          name="sku"
          value={form.sku}
          onChange={handleChange}
          placeholder="SKU"
          className="border p-2 rounded"
          required
        />
        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="Tags"
          className="border p-2 rounded"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="low_stock_threshold"
          value={form.low_stock_threshold}
          onChange={handleChange}
          placeholder="Low Stock Threshold"
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded col-span-2"
        />
        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
