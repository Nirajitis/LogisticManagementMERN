import React, { useState, useEffect } from "react";

export default function AdminFormModal({
  category,
  item,
  mode, // "add" or "edit"
  onClose,
  onSaved,
  onDeleted
}) {

  const apiUrl = `http://localhost:4001/api/admin/${category.toLowerCase()}`;

  const getInitialState = () => {
    switch (category) {
      case "Drivers":
        return {
          name: "",
          cellPhone: "",
          licenseNumber: "",
          email: "",
          street: "",
          city: "",
          state: "",
          pincode: ""
        };

      case "Trucks":
      case "Trailers":
        return {
          unitNumber: "",
          makeModel: "",
          year: "",
          registrationNumber: "",
          companyOwned: false
        };

      case "Shippers":
      case "Consignees":
        return {
          name: "",
          street: "",
          city: "",
          state: "",
          pincode: "",
          contactNumber: "",
          pointOfContact: ""
        };

      case "Customers":
        return {
          name: "",
          pointOfContact: "",
          cellPhone: "",
          email: "",
          street: "",
          city: "",
          state: "",
          pincode: ""
        };

      default:
        return {};
    }
  };

  const [formData, setFormData] = useState(getInitialState());

  // If edit mode, merge existing data
  useEffect(() => {
    if (mode === "edit" && item) {
      setFormData(prev => ({
        ...prev,
        ...item
      }));
    }
  }, [item, mode]);

  const handleChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // SAVE (Add or Update)
  const handleSave = async () => {
    try {
      const method = mode === "edit" ? "PUT" : "POST";
      const url =
        mode === "edit"
          ? `${apiUrl}/${item._id}`
          : apiUrl;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Save failed");

      const result = await res.json();

      if (result?.data) {
        onSaved(result.data);
        onClose();
      }
    } catch (err) {
      console.error(err);
      alert("Error saving data.");
    }
  };

  // DELETE (Only in Edit Mode)
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(`${apiUrl}/${item._id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Delete failed");

      onDeleted(item._id);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error deleting item.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[60]">

      <div className="w-[800px] bg-base-100 shadow-xl rounded border">

        {/* HEADER */}
        <div className="flex justify-between items-center bg-neutral text-neutral-content px-4 py-2 border-b-2 border-red-500 rounded-t">
          <h2 className="font-semibold">
            {mode === "edit" ? "Edit" : "Add"} {category.slice(0, -1)}
          </h2>
          <button onClick={onClose} className="btn btn-sm btn-error">
            ✕
          </button>
        </div>

        {/* FORM */}
        <div className="p-6 grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm font-medium capitalize">
                {key}
              </label>

              {typeof value === "boolean" ? (
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm mt-2"
                  checked={value}
                  onChange={e => handleChange(key, e.target.checked)}
                />
              ) : (
                <input
                  className="input input-bordered input-sm"
                  value={value || ""}
                  onChange={e => handleChange(key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center p-4 border-t bg-base-200">

          {mode === "edit" && (
            <button onClick={handleDelete} className="btn btn-error">
              DELETE
            </button>
          )}

          <div className="flex gap-3">
            <button onClick={onClose} className="btn">
              CANCEL
            </button>
            <button onClick={handleSave} className="btn btn-primary">
              SAVE
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}