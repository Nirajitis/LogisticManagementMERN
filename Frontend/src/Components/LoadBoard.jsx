import React, { useState } from "react";
import LoadModal from "./LoadModal"; // shared modal

const rowStatusColors = {
  Open: "bg-red-50",
  Pending: "bg-yellow-50",
  Dispatched: "bg-blue-50",
  "On Route": "bg-green-50",
  Covered: "bg-purple-50",
  Loading: "bg-orange-50",
  Unloading: "bg-gray-100",
  "In Yard": "bg-pink-50"
};

export default function LoadBoard({ loads = [], setLoads = () => {} }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [formData, setFormData] = useState({
    loadNumber: "",
    workOrder: "",
    driver: "",
    carrier: "",
    shipDate: "",
    deliveryDate: "",
    customer: "",
    origin: "",
    destination: "",
    status: "Open",
  });

  const openNewLoadModal = () => {
    setSelectedIndex(null);
    setFormData({
      loadNumber: "",
      workOrder: "",
      driver: "",
      carrier: "",
      shipDate: "",
      deliveryDate: "",
      customer: "",
      origin: "",
      destination: "",
      status: "Open",
    });
    setShowModal(true);
  };

  const openEditModal = (index) => {
    setSelectedIndex(index);
    setFormData(loads[index]);
    setShowModal(true);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    if (selectedIndex === null) {
      setLoads([...loads, formData]); // ✅ add new load
    } else {
      const updated = [...loads];
      updated[selectedIndex] = formData;
      setLoads(updated); // ✅ update existing load
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    const updated = loads.filter((_, i) => i !== selectedIndex);
    setLoads(updated); // ✅ delete load
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Load Table */}
      <div className="navbar bg-white fixed top-36 shadow-sm w-full md:px-5 px-6">
        <table className="table table-zebra w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th>Load #</th>
              <th>W/O #</th>
              <th>Driver</th>
              
              <th>Ship Date</th>
              <th>Del Date</th>
              <th>Customer</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loads.length > 0 ? (
              loads.map((load, index) => (
                <tr key={load.id} className={rowStatusColors[load.status]}>
                  <td>
                    <button
                      className="link link-primary"
                      onClick={() => openEditModal(index)}
                    >
                      {load.loadNumber}
                    </button>
                  </td>
                  <td>{load.workOrder}</td>
                  <td>{load.driver}</td>
                  
                  <td>{load.pickupDate}</td>
                  <td>{load.deliveryDate}</td>
                  <td>{load.customer}</td>
                  <td>{load.pickupCity}, {load.pickupState}</td>
                  <td>{load.deliveryCity}, {load.deliveryState}</td>
                  <td>
                 <select
                    className="select select-sm select-bordered"
                    value={load.status}
                    onChange={(e) => {
                      const updated = [...loads];
                      updated[index] = {
                        ...updated[index],
                        status: e.target.value
                      };
                      setLoads(updated);
                    }}
                  >
                    <option value="Open">Open</option>
                    <option value="Pending">Pending</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="On Route">On Route</option>
                    <option value="Covered">Covered</option>
                    <option value="Loading">Loading</option>
                    <option value="Unloading">Unloading</option>
                    <option value="In Yard">In Yard</option>
                  </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                {/* ✅ colSpan must be a number, not string */}
                <td colSpan={9} className="text-center text-sm opacity-60">
                  No loads added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Shared Modal */}
      {showModal && (
        <LoadModal
          mode={selectedIndex === null ? "create" : "edit"}
          formData={formData}
          onChange={handleChange}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

// Status badge colors
function getStatusColor(status) {
  switch (status) {
    case "Pending":
      return "badge-warning";
    case "Open":
      return "badge-error";
    case "Dispatched":
      return "badge-success";
    case "On Route":
      return "badge-info";
    default:
      return "badge-neutral";
  }
}