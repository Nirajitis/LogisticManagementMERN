import React, { useState } from "react";
import LoadModal from "./LoadModal"; // import the shared modal
import LoadBoard from "./LoadBoard"; // import the load table

function ControlCenter({ loads, setLoads, statusFilter, setStatusFilter }) {
  
  const statusOptions = [
    "Open",
    "Pending",
    "Dispatched",
    "On Route",
    "Covered",
    "Loading",
    "Unloading",
    "In Yard"
  ];

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    loadNumber: "",
    customer: "",
    workOrder: "",
    driver: "",
    truckNum: "",
    trailerNum: "",
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
    deliveryNotes: "",
    status: "Open",
  });


  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    console.log("New load created:", formData);
    setLoads(prev => [...prev, { ...formData, id: Date.now() }]); // ✅ update shared state
    setOpenModal(false);
  };

  return (
    <>
      {/* Navbar */}
      <div className="navbar bg-white fixed top-20 shadow-sm w-full px-6 md:px-10 flex justify-between items-center">
        {/* Left side */}
        <div className="-ml-[1px]">
          <button
            className="btn btn-ghost btn-outline px-0"
            onClick={() => setOpenModal(true)}
          >
            Create New Load
          </button>
        </div>

        {/* Right side */}
        <div className="flex gap-4 items-center -mr-[1px]">
          <input type="date" className="input" />
          <input type="date" className="input" />

          <div className="join">
            <input
              type="search"
              placeholder="Search..."
              className="input input-bordered join-item w-64"
            />
            <button className="btn btn-warning join-item">Search</button>
          </div>
        </div>
      </div>

      {/* Load Table */}
      <div className="mt-40 px-6 md:px-10">
        <LoadBoard loads={loads} setLoads={setLoads} />
      </div>

      {/* Shared Modal */}
      {openModal && (
        <LoadModal
          mode="create"
          formData={formData}
          onChange={handleChange}
          onSave={handleSave}
          onDelete={() => setOpenModal(false)} // Delete just closes in create mode
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
}

export default ControlCenter;