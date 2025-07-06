import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Inbound() {
  const [entries, setEntries] = useState([]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [receivedFrom, setReceivedFrom] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchInbound();
    fetchProducts();
  }, []);

  const fetchInbound = async () => {
    try {
      const res = await axios.get('/api/inbound/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntries(res.data);
    } catch (err) {
      console.error('Failed to fetch inbound entries', err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/inventory/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product || !quantity || !receivedFrom) {
      setError('All fields are required.');
      return;
    }
    try {
      await axios.post('/api/inbound/', {
        product,
        quantity,
        received_from: receivedFrom
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProduct('');
      setQuantity('');
      setReceivedFrom('');
      setError('');
      fetchInbound();
    } catch (err) {
      console.error('Inbound entry failed', err);
      setError('Failed to create inbound entry.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Inbound Management</h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">Add New Inbound</h3>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="">Select Product</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />

        <input
          type="text"
          placeholder="Received From"
          value={receivedFrom}
          onChange={(e) => setReceivedFrom(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">Inbound History</h3>
      <table className="min-w-full bg-white border border-gray-300 rounded shadow-md text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Product</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">From</th>
            <th className="px-4 py-2 border">Received At</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.id} className="text-center">
              <td className="px-2 py-1 border">{entry.product_name}</td>
              <td className="px-2 py-1 border">{entry.quantity}</td>
              <td className="px-2 py-1 border">{entry.received_from}</td>
              <td className="px-2 py-1 border">
                {new Date(entry.received_at).toLocaleString()}
              </td>
            </tr>
          ))}
          {entries.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">No inbound records.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
