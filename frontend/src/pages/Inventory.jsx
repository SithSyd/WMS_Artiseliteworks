import { useEffect, useState } from 'react';
import InventoryTable from '../components/InventoryTable';
import axios from 'axios';
import UploadInventoryFile from "../components/UploadInventoryFile";

export default function Inventory() {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios
      .get('inventory/')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Fetch error:', err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
    <UploadInventoryFile onUploaded={fetchProducts} />
    <InventoryTable products={products} onProductDeleted={fetchProducts} />
  </div>
  );
}
