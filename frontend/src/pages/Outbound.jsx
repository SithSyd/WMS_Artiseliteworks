import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Outbound() {
  const [products, setProducts] = useState([]);
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ product: '', quantity: '', sent_to: '' });

  const fetchData = async () => {
    try {
      const productRes = await axios.get('/api/inventory/');
      const outboundRes = await axios.get('/api/outbound/');
      setProducts(productRes.data);
      setEntries(outboundRes.data);
    } catch (err) {
      console.error('Load error:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.product || !form.quantity || !form.sent_to) return;

    try {
      await axios.post('/api/outbound/', form);
      setForm({ product: '', quantity: '', sent_to: '' });
      fetchData();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Outbound Management</h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 flex flex-col gap-3">
        <select
          value={form.product}
          onChange={(e) => setForm({ ...form, product: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          placeholder="Quantity"
          className="border p-2 rounded"
        />

        <input
          type="text"
          value={form.sent_to}
          onChange={(e) => setForm({ ...form, sent_to: e.target.value })}
          placeholder="Sent to (e.g. Customer name)"
          className="border p-2 rounded"
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-max">
          Submit Outbound
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Outbound Logs</h3>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="border px-4 py-2">Product</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Sent To</th>
            <th className="border px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id} className="text-sm text-center">
              <td className="border px-2 py-1">{entry.product_name}</td>
              <td className="border px-2 py-1">{entry.quantity}</td>
              <td className="border px-2 py-1">{entry.sent_to}</td>
              <td className="border px-2 py-1">{new Date(entry.sent_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
