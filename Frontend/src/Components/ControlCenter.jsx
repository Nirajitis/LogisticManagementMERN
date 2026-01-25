import React, { useState } from "react";
import LoadModal from "./LoadModal"; // import the shared modal
import LoadBoard from "./LoadBoard"; // import the load table

function ControlCenter({ loads, setLoads}) {
  

  
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

    status: "Open"
  });


  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
  const payload = {
    loadNumber: formData.loadNumber,
    customer: formData.customer,
    workOrder: formData.workOrder,
    driver: formData.driver,
    truckNum: formData.truckNum,
    trailerNum: formData.trailerNum,
    status: formData.status,

    pickup: {
      shipper: formData.shipper || "",
      street: formData.pickupStreet || "",
      city: formData.pickupCity || "",
      state: formData.pickupState || "",
      zip: formData.pickupZip || "",
      date: formData.pickupDate || null,
      notes: formData.pickupNotes || ""
    },

    delivery: {
      consignee: formData.consignee || "",
      street: formData.deliveryStreet || "",
      city: formData.deliveryCity || "",
      state: formData.deliveryState || "",
      zip: formData.deliveryZip || "",
      date: formData.deliveryDate || null,
      notes: formData.deliveryNotes || ""
    }
  };
  console.log("PAYLOAD SENDING:", payload);

  try {

    const res = await fetch("http://localhost:4001/api/loads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await res.json();

    console.log("CREATE RESPONSE:", result);

    // Update UI using DB response
    setLoads(prev => [result.data, ...prev]);

    setOpenModal(false);

  } catch (error) {
    console.error("Create load failed:", error);
  }
};


  return (
    <>
      {/* Navbar */}
      <div className="navbar h-16 min-h-0 bg-white sticky top-20 z-30 shadow-sm w-full px-6 md:px-10 flex justify-between items-center">
        {/* Left side */}
        <div className="-ml-[1px]">
          <button
            className="btn btn-warning join-item"
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