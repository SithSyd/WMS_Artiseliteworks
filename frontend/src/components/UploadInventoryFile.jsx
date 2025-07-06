import { useState } from 'react';
import axios from 'axios';

export default function UploadInventoryFile({ onUploaded }) {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post('/api/inventory/upload/', formData);
      alert("✅ Upload successful");
      onUploaded();  // refresh product list
      setFile(null);
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Upload failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex items-center gap-2">
      <input
        type="file"
        accept=".csv,.xlsx"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
    </form>
  );
}
