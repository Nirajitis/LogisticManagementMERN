import React, { useState } from "react";
import LoadModal from "./LoadModal";

// Row highlight colors by status
const rowStatusColors = {
  Open: "bg-red-50",
  Pending: "bg-yellow-50",
  Dispatched: "bg-blue-50",
  "On Route": "bg-green-50",
  Covered: "bg-purple-50",
  Loading: "bg-orange-50",
  Unloading: "bg-gray-100",
  "In Yard": "bg-pink-50",
};

export default function LoadBoard({ loads = [], setLoads }) {

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [formData, setFormData] = useState({
    loadNumber: "",
    workOrder: "",
    driver: "",
    customer: "",
    status: "Open",

    shipper: "",
    pickupStreet: "",
    pickupCity: "",
    pickupState: "",
    pickupZip: "",
    pickupDate: "",
    pickupNotes: "",

    consignee: "",
    deliveryStreet: "",
    deliveryCity: "",
    deliveryState: "",
    deliveryZip: "",
    deliveryDate: "",
    deliveryNotes: ""
  });

  // ================= OPEN EDIT MODAL =================

  const openEditModal = (load) => {

    setSelectedId(load._id);

    setFormData({
      loadNumber: load.loadNumber || "",
      workOrder: load.workOrder || "",
      driver: load.driver || "",
      customer: load.customer || "",
      status: load.status || "Open",

      shipper: load.pickup?.shipper || "",
      pickupStreet: load.pickup?.street || "",
      pickupCity: load.pickup?.city || "",
      pickupState: load.pickup?.state || "",
      pickupZip: load.pickup?.zip || "",
      pickupDate: load.pickup?.date?.slice(0, 10) || "",
      pickupNotes: load.pickup?.notes || "",

      consignee: load.delivery?.consignee || "",
      deliveryStreet: load.delivery?.street || "",
      deliveryCity: load.delivery?.city || "",
      deliveryState: load.delivery?.state || "",
      deliveryZip: load.delivery?.zip || "",
      deliveryDate: load.delivery?.date?.slice(0, 10) || "",
      deliveryNotes: load.delivery?.notes || ""
    });

    setShowModal(true);
  };

  // ================= INPUT HANDLER =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ================= SAVE EDIT (PUT API) =================

  const handleSave = async (e) => {
    e.preventDefault();

    try {

      const payload = {
        loadNumber: formData.loadNumber,
        workOrder: formData.workOrder,
        driver: formData.driver,
        customer: formData.customer,
        status: formData.status,

        pickup: {
          shipper: formData.shipper,
          street: formData.pickupStreet,
          city: formData.pickupCity,
          state: formData.pickupState,
          zip: formData.pickupZip,
          date: formData.pickupDate,
          notes: formData.pickupNotes
        },

        delivery: {
          consignee: formData.consignee,
          street: formData.deliveryStreet,
          city: formData.deliveryCity,
          state: formData.deliveryState,
          zip: formData.deliveryZip,
          date: formData.deliveryDate,
          notes: formData.deliveryNotes
        }
      };

      const res = await fetch(
        `http://localhost:4001/api/loads/${selectedId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      const result = await res.json();

      setLoads(prev =>
        prev.map(load =>
          load._id === selectedId ? result.data : load
        )
      );

      setShowModal(false);

    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  // ================= DELETE LOAD =================

  const handleDelete = async () => {

    try {

      await fetch(
        `http://localhost:4001/api/loads/${selectedId}`,
        { method: "DELETE" }
      );

      setLoads(prev =>
        prev.filter(load => load._id !== selectedId)
      );

      setShowModal(false);

    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // ================= STATUS DROPDOWN =================

  const updateStatus = async (id, status) => {

    try {

      const res = await fetch(
        `http://localhost:4001/api/loads/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status })
        }
      );

      const result = await res.json();

      setLoads(prev =>
        prev.map(load =>
          load._id === id ? result.data : load
        )
      );

    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  // ================= ACTIVE FILTER =================

  const activeLoads = loads.filter(load =>
    !["Delivered", "Completed", "Closed"].includes(load.status)
  );

  // ================= UI =================

  return (
    <div className="w-full">

  <div className="bg-white shadow-md overflow-auto h-[calc(100vh-160px)]">

    <table className="table table-zebra w-full">

      <thead className="bg-blue-600 text-white sticky top-0 z-20">
            <tr>
              <th>Load #</th>
              <th>W/O #</th>
              <th>Driver</th>
              <th>Pickup Date</th>
              <th>Delivery Date</th>
              <th>Customer</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {activeLoads.length > 0 ? (

              activeLoads.map((load) => (

                <tr
                  key={load._id}
                  className={rowStatusColors[load.status] || ""}
                >

                  <td>
                    <button
                      className="link link-primary"
                      onClick={() => openEditModal(load)}
                    >
                      {load.loadNumber}
                    </button>
                  </td>

                  <td>{load.workOrder}</td>
                  <td>{load.driver}</td>

                  <td>
                    {load.pickup?.date
                      ? new Date(load.pickup.date).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    {load.delivery?.date
                      ? new Date(load.delivery.date).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>{load.customer}</td>

                  <td>
                    {load.pickup?.city}, {load.pickup?.state}
                  </td>

                  <td>
                    {load.delivery?.city}, {load.delivery?.state}
                  </td>

                  <td>
                    <select
                      className="select select-sm select-bordered"
                      value={load.status}
                      onChange={(e) =>
                        updateStatus(load._id, e.target.value)
                      }
                    >
                      <option>Open</option>
                      <option>Pending</option>
                      <option>Dispatched</option>
                      <option>On Route</option>
                      <option>Loading</option>
                      <option>Unloading</option>
                      <option>In Yard</option>
                      <option>Delivered</option>
                      <option>Completed</option>
                      <option>Closed</option>
                    </select>
                  </td>

                </tr>
              ))

            ) : (

              <tr>
                <td colSpan={9} className="text-center py-6 opacity-60">
                  No loads available
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      {showModal && (
        <LoadModal
          mode="edit"
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
