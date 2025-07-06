import { useState } from 'react';
import axios from 'axios';
import EditProductModal from './EditProductModal';

export default function InventoryTable({ products, onProductDeleted }) {
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`inventory/${id}/`);
      if (onProductDeleted) onProductDeleted();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleArchiveToggle = async (product) => {
    try {
      await axios.patch(`inventory/${product.id}/`, {
        is_archived: !product.is_archived,
      });
      if (onProductDeleted) onProductDeleted();
    } catch (err) {
      console.error("Archive toggle failed:", err);
    }
  };

  const toggleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const filteredProducts = products
    .filter(prod =>
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(prod => {
      if (filterStatus === 'active') return !prod.is_archived;
      if (filterStatus === 'archived') return prod.is_archived;
      return true;
    });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortBy) return 0;
    let valA = a[sortBy];
    let valB = b[sortBy];
    if (sortBy === 'created_at' || sortBy === 'updated_at') {
      valA = new Date(valA);
      valB = new Date(valB);
    }
    if (typeof valA === 'string') {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Inventory</h2>

      <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search name, SKU, or category..."
          className="border p-2 rounded w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1 rounded border ${
              filterStatus === 'all' ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus('active')}
            className={`px-3 py-1 rounded border ${
              filterStatus === 'active' ? 'bg-green-500 text-white' : 'bg-white'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilterStatus('archived')}
            className={`px-3 py-1 rounded border ${
              filterStatus === 'archived' ? 'bg-gray-500 text-white' : 'bg-white'
            }`}
          >
            Archived
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-300 rounded shadow-md">
        <thead className="bg-gray-100 text-sm">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border cursor-pointer" onClick={() => toggleSort('name')}>
              Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-4 py-2 border">SKU</th>
            <th className="px-4 py-2 border">Tags</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border cursor-pointer" onClick={() => toggleSort('category')}>
              Category {sortBy === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-4 py-2 border cursor-pointer" onClick={() => toggleSort('quantity')}>
              Quantity {sortBy === 'quantity' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-4 py-2 border">Low Stock</th>
            <th className="px-4 py-2 border">Archived</th>
            <th className="px-4 py-2 border cursor-pointer" onClick={() => toggleSort('created_at')}>
              Created {sortBy === 'created_at' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-4 py-2 border cursor-pointer" onClick={() => toggleSort('updated_at')}>
              Updated {sortBy === 'updated_at' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map(prod => (
            <tr key={prod.id} className="text-center text-sm">
              <td className="px-2 py-1 border">{prod.id}</td>
              <td className="px-2 py-1 border">{prod.name}</td>
              <td className="px-2 py-1 border">{prod.sku}</td>
              <td className="px-2 py-1 border">{prod.tags}</td>
              <td className="px-2 py-1 border">{prod.description}</td>
              <td className="px-2 py-1 border">{prod.category}</td>
              <td
                className={`px-2 py-1 border ${
                  prod.quantity <= prod.low_stock_threshold
                    ? 'bg-red-100 text-red-700 font-semibold'
                    : ''
                }`}
              >
                {prod.quantity}
              </td>
              <td className="px-2 py-1 border">{prod.low_stock_threshold}</td>
              <td className="px-2 py-1 border">{prod.is_archived ? 'Yes' : 'No'}</td>
              <td className="px-2 py-1 border">{new Date(prod.created_at).toLocaleString()}</td>
              <td className="px-2 py-1 border">{new Date(prod.updated_at).toLocaleString()}</td>
              <td className="px-2 py-1 border flex flex-col gap-1 items-center">
                <button
                  onClick={() => handleDelete(prod.id)}
                  className="bg-red-500 text-white text-xs px-2 py-1 rounded w-20"
                >
                  Delete
                </button>
                <button
                  onClick={() => setEditingProduct(prod)}
                  className="bg-yellow-500 text-white text-xs px-2 py-1 rounded w-20"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleArchiveToggle(prod)}
                  className={`${
                    prod.is_archived ? 'bg-green-600' : 'bg-gray-600'
                  } text-white text-xs px-2 py-1 rounded w-20`}
                >
                  {prod.is_archived ? 'Unarchive' : 'Archive'}
                </button>
              </td>
            </tr>
          ))}
          {sortedProducts.length === 0 && (
            <tr>
              <td colSpan="12" className="text-center text-gray-500 py-4">
                No matching products.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdated={onProductDeleted}
        />
      )}
    </div>
  );
}
