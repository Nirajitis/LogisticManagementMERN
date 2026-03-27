import React, { useState } from "react";
import LoadModal from "./LoadModal";
import LoadBoard from "./LoadBoard";

function ControlCenter({ loads, setLoads }) {

  const [openModal, setOpenModal] = useState(false);

  // 🔹 NEW FILTER STATES
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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

    try {
      const res = await fetch("http://localhost:4001/api/loads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      setLoads(prev => [result.data, ...prev]);
      setOpenModal(false);

    } catch (error) {
      console.error("Create load failed:", error);
    }
  };

  // 🔹 FILTER LOGIC
  const filteredLoads = loads
  // 🔹 REMOVE archived loads from home
  .filter(load =>
    !["Delivered", "Completed", "Closed"].includes(load.status)
  )
  // 🔹 THEN apply search + date filter
  .filter((load) => {

    const text = searchTerm.toLowerCase();

    const matchesSearch =
      load.loadNumber?.toLowerCase().includes(text) ||
      load.driver?.toLowerCase().includes(text) ||
      load.customer?.toLowerCase().includes(text) ||
      load.workOrder?.toLowerCase().includes(text) ||
      load.pickup?.city?.toLowerCase().includes(text) ||
      load.delivery?.city?.toLowerCase().includes(text);

    const loadDate = load.pickup?.date
      ? load.pickup.date.slice(0, 10)
      : null;

    let matchesDate = true;

    if (fromDate && loadDate) {
      matchesDate = loadDate >= fromDate;
    }

    if (toDate && loadDate && matchesDate) {
      matchesDate = loadDate <= toDate;
    }

    return matchesSearch && matchesDate;
  });

  return (
    <>
      <div className="navbar h-16 min-h-0 bg-white sticky top-20 z-30 shadow-sm w-full px-6 md:px-10 flex justify-between items-center">

        <div className="-ml-[1px]">
          <button
            className="btn btn-warning join-item"
            onClick={() => setOpenModal(true)}
          >
            Create New Load
          </button>
        </div>

        <div className="flex gap-4 items-center -mr-[1px]">

          {/* 🔹 FROM DATE */}
          <input
            type="date"
            className="input"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />

          {/* 🔹 TO DATE */}
          <input
            type="date"
            className="input"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />

          <div className="join">
            <input
              type="search"
              placeholder="Search..."
              className="input input-bordered join-item w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-warning join-item">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 PASS FILTERED LOADS */}
      <LoadBoard loads={filteredLoads} setLoads={setLoads} />

      {openModal && (
        <LoadModal
          mode="create"
          formData={formData}
          onChange={handleChange}
          onSave={handleSave}
          onDelete={() => setOpenModal(false)}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
}

export default ControlCenter;