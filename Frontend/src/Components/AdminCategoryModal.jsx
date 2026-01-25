import React, { useEffect, useState } from "react";

export default function AdminCategoryModal({ category, onClose }) {

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [newItem, setNewItem] = useState("");

  const apiUrl = `http://localhost:4001/api/admin/${category.toLowerCase()}`;

  // Fetch Data
  useEffect(() => {

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setItems(data.data || []))
      .catch(err => console.error(err));

  }, [category]);

  // Add Item
  const handleAdd = async () => {

    if (!newItem.trim()) return;

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newItem })
    });

    const result = await res.json();

    setItems(prev => [...prev, result.data]);
    setNewItem("");
  };

  // Delete Item
  const handleDelete = async (id) => {

    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });

    setItems(prev => prev.filter(i => i._id !== id));
  };

  // Search Filter
  const filtered = items.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center">

      <div className="bg-white w-[500px] rounded-lg p-6 max-h-[80vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{category}</h2>
          <button onClick={onClose} className="btn btn-sm">✕</button>
        </div>

        {/* Search */}
        <input
          className="input input-bordered w-full mb-3"
          placeholder={`Search ${category}`}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {/* Add */}
        <div className="flex gap-2 mb-4">
          <input
            className="input input-bordered flex-1"
            placeholder={`Add new ${category.slice(0,-1)}`}
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
          />
          <button onClick={handleAdd} className="btn btn-primary">
            Add
          </button>
        </div>

        {/* List */}
        <div className="space-y-2">

          {filtered.map(item => (
            <div
              key={item._id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>{item.name}</span>

              <button
                onClick={() => handleDelete(item._id)}
                className="btn btn-xs btn-error"
              >
                Delete
              </button>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}
