import { useState } from "react";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";

export default function Division() {
  const { data, isLoading } = useGetDivisionsQuery(undefined);
  const [search, setSearch] = useState("");

  if (isLoading) {
    return <p className="text-center mt-10">Loading divisions...</p>;
  }

  const divisions = data?.data || [];

  // Filter divisions by search
  const filteredDivisions = divisions.filter((division) =>
    division.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Divisions</h2>
        <input
          type="text"
          placeholder="Search division..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      {/* Division Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDivisions.length > 0 ? (
          filteredDivisions.map((division) => (
            <div
              key={division._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={division.thumbnail}
                alt={division.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{division.name}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  {division.description.length > 100
                    ? division.description.slice(0, 100) + "..."
                    : division.description}
                </p>
                <span className="inline-block text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  {division.slug}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No divisions found.
          </p>
        )}
      </div>
    </div>
  );
}
