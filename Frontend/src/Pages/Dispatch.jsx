import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dispatch({ loads }) {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Only completed/archived loads
  const archivedLoads = loads.filter(load =>
    ["Delivered", "Completed", "Closed"].includes(load.status)
  );

  // Search + Date Filter
  const filteredLoads = archivedLoads.filter(load => {

    const searchText = search.toLowerCase();

    const matchesSearch =
      load.loadNumber?.toLowerCase().includes(searchText) ||
      load.workOrder?.toLowerCase().includes(searchText) ||
      load.driver?.toLowerCase().includes(searchText) ||
      load.customer?.toLowerCase().includes(searchText) ||
      load.truckNum?.toLowerCase().includes(searchText) ||
      load.trailerNum?.toLowerCase().includes(searchText);

    const completedDate = load.completedAt
      ? new Date(load.completedAt)
      : null;

    const afterFrom =
      !fromDate || completedDate >= new Date(fromDate);

    const beforeTo =
      !toDate || completedDate <= new Date(toDate);

    return matchesSearch && afterFrom && beforeTo;
  });

  return (
    <div className="p-6">

    <div className="flex items-center justify-between mb-4">

        <h2 className="text-xl font-bold">
            Dispatch History (Completed Loads)
        </h2>

        <button
            className="btn btn-sm btn-outline"
            onClick={() => navigate("/")}
        >
            ← Back
        </button>

    </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap mb-4">

        <input
          type="text"
          placeholder="Search load, driver, customer..."
          className="input input-bordered w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="date"
          className="input input-bordered"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          className="input input-bordered"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

      </div>

      {/* History Table */}
      <div className="overflow-x-auto bg-white shadow">

        <table className="table w-full">

          <thead className="bg-blue-600 text-white">
            <tr>
              <th>Load #</th>
              <th>Driver</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Completed On</th>
            </tr>
          </thead>

          <tbody>

            {filteredLoads.length ? (
              filteredLoads.map(load => (
                <tr key={load.id}>
                  <td>{load.loadNumber}</td>
                  <td>{load.driver}</td>
                  <td>{load.customer}</td>
                  <td>{load.status}</td>
                  <td>
                    {load.completedAt
                      ? new Date(load.completedAt).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 opacity-60">
                  No completed loads found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}
