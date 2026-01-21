import React from "react";

export default function LoadModal({
  mode,          // "create" or "edit"
  formData,
  onChange,
  onSave,
  onDelete,
  onClose,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] max-h-[90vh] overflow-y-auto">
        
        <h2 className="text-xl font-bold mb-4">
          {mode === "create" ? "Create New Load" : "Edit Load"}
        </h2>

        {/* Load Info */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <input name="loadNumber" value={formData.loadNumber} onChange={onChange} placeholder="Load Number" className="input input-bordered" required />
          <input name="customer" value={formData.customer} onChange={onChange} placeholder="Customer Name" className="input input-bordered" />
          <input name="workOrder" value={formData.workOrder} onChange={onChange} placeholder="WO Number" className="input input-bordered" />
          <input name="driver" value={formData.driver} onChange={onChange} placeholder="Driver Name" className="input input-bordered" />
          <input name="truckNum" value={formData.truckNum} onChange={onChange} placeholder="Truck Num" className="input input-bordered" />
          <input name="trailerNum" value={formData.trailerNum} onChange={onChange} placeholder="Trailer Num" className="input input-bordered" />
        </div>

        {/* Pickup Info */}
        <h3 className="text-lg font-semibold mb-2">Pickup Information</h3>
        <input name="shipper" value={formData.shipper} onChange={onChange} placeholder="Shipper Name" className="input input-bordered w-full mb-2" />
        <div className="grid grid-cols-2 gap-4 mb-2">
          <input name="pickupStreet" value={formData.pickupStreet} onChange={onChange} placeholder="Street" className="input input-bordered" />
          <input name="pickupCity" value={formData.pickupCity} onChange={onChange} placeholder="City" className="input input-bordered" />
          <input name="pickupState" value={formData.pickupState} onChange={onChange} placeholder="State" className="input input-bordered" />
          <input name="pickupZip" value={formData.pickupZip} onChange={onChange} placeholder="Pincode" className="input input-bordered" />
        </div>
        <input type="date" name="pickupDate" value={formData.pickupDate} onChange={onChange} className="input input-bordered w-full mb-2" />
        <textarea name="pickupNotes" value={formData.pickupNotes} onChange={onChange} placeholder="Pickup Notes" className="textarea textarea-bordered w-full mb-4"></textarea>

        {/* Delivery Info */}
        <h3 className="text-lg font-semibold mb-2">Delivery Information</h3>
        <input name="consignee" value={formData.consignee} onChange={onChange} placeholder="Consignee Name" className="input input-bordered w-full mb-2" />
        <div className="grid grid-cols-2 gap-4 mb-2">
          <input name="deliveryStreet" value={formData.deliveryStreet} onChange={onChange} placeholder="Street" className="input input-bordered" />
          <input name="deliveryCity" value={formData.deliveryCity} onChange={onChange} placeholder="City" className="input input-bordered" />
          <input name="deliveryState" value={formData.deliveryState} onChange={onChange} placeholder="State" className="input input-bordered" />
          <input name="deliveryZip" value={formData.deliveryZip} onChange={onChange} placeholder="Pincode" className="input input-bordered" />
        </div>
        <input type="date" name="deliveryDate" value={formData.deliveryDate} onChange={onChange} className="input input-bordered w-full mb-2" />
        <textarea name="deliveryNotes" value={formData.deliveryNotes} onChange={onChange} placeholder="Delivery Notes" className="textarea textarea-bordered w-full mb-4"></textarea>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          {mode === "edit" && (
            <button className="btn btn-error" onClick={onDelete}>
              Delete
            </button>
          )}
          <button className="btn btn-success" onClick={onSave}>
            {mode === "create" ? "Submit" : "Save Changes"}
          </button>
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}