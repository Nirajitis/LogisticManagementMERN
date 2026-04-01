import React, { useEffect, useState } from "react";
import AdminFormModal from "./AdminFormModal";

export default function AdminListModal({ category, onClose }) {

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const apiUrl = `http://localhost:4001/api/admin/${category.toLowerCase()}`;

  // FETCH DATA
  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setItems(data);
        } else if (Array.isArray(data.data)) {
          setItems(data.data);
        } else {
          setItems([]);
        }
      })
      .catch(err => {
        console.error("API ERROR:", err);
        setItems([]);
      });
  }, [apiUrl]);

  // SAFE SEARCH FILTER
  const filtered = items.filter(item =>
    Object.values(item)
      .map(val => String(val || ""))
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // TABLE HEADERS
  const tableKeys =
    items.length > 0
      ? Object.keys(items[0]).filter(key => key !== "_id")
      : [];

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

        <div className="w-[1100px] bg-base-100 shadow-xl rounded border">

          {/* HEADER */}
          <div className="flex justify-between items-center bg-blue-600 text-white px-5 py-3 rounded-t">
            <div className="flex items-center gap-3">
              <h2 className="font-semibold text-lg">
                {category} List
              </h2>
              <button
                className="btn btn-sm btn-success"
                onClick={() => setShowAddModal(true)}
              >
                ADD
              </button>
            </div>

            <button onClick={onClose} className="btn btn-sm btn-error">
              ✕
            </button>
          </div>

          {/* SEARCH */}
          <div className="flex justify-between items-center p-4 bg-base-200 border-b">
            <div />
            <div className="flex gap-2">
              <input
                className="input input-sm input-bordered"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button
                className="btn btn-sm"
                onClick={() => setSearch("")}
              >
                SHOW ALL
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-y-auto max-h-[60vh]">
            <table className="table table-sm w-full">

              <thead className="bg-base-300 sticky top-0">
                <tr>
                  {tableKeys.map(key => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Edit</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={tableKeys.length + 1}
                      className="text-center py-4"
                    >
                      No Data Found
                    </td>
                  </tr>
                ) : (
                  filtered.map(item => (
                    <tr key={item._id} className="hover">
                      {tableKeys.map(key => (
                        <td key={key}>
                          {typeof item[key] === "boolean"
                            ? item[key] ? "Yes" : "No"
                            : item[key]}
                        </td>
                      ))}

                      <td>
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="btn btn-xs btn-warning"
                        >
                          ✏
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>

        </div>
      </div>

      {/* EDIT MODAL */}
      {selectedItem && (
        <AdminFormModal
          mode="edit"
          category={category}
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSaved={(updated) =>
            setItems(prev =>
              prev.map(i =>
                i._id === updated._id ? updated : i
              )
            )
          }
          onDeleted={(id) =>
            setItems(prev =>
              prev.filter(i => i._id !== id)
            )
          }
        />
      )}

      {/* ADD MODAL */}
      {showAddModal && (
        <AdminFormModal
          mode="add"
          category={category}
          onClose={() => setShowAddModal(false)}
          onSaved={(newItem) =>
            setItems(prev => [newItem, ...prev])
          }
        />
      )}
    </>
  );
}