import React, { useState } from "react";
import AdminCategoryModal from "../Components/AdminCategoryModal";

const categories = [
  "Drivers",
  "Trucks",
  "Trailers",
  "Customers",
  "Shippers",
  "Consignees",
];

export default function Admin() {

  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      {/* Category Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="cursor-pointer bg-white shadow rounded-lg p-6 text-center hover:bg-blue-50 transition"
          >
            <h2 className="text-lg font-semibold">{cat}</h2>
          </div>
        ))}

      </div>

      {/* Modal */}
      {selectedCategory && (
        <AdminCategoryModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}

    </div>
  );
}
