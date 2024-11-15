"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CarDetail({ params }) {
  const [car, setCar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    // In a real app, you would fetch the car details from your API here
    setCar({
      id: 1,
      title: "Toyota Camry",
      description: "Reliable sedan",
      tags: ["sedan", "toyota"],
      images: ["https://example.com/camry.jpg"],
    });
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // In a real app, you would send the updated car data to your API here
    setIsEditing(false);
  };

  const handleDelete = () => {
    // In a real app, you would send a delete request to your API here
    router.push("/dashboard");
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">
        {isEditing ? "Edit Car" : car.title}
      </h1>
      {isEditing ? (
        <form onSubmit={handleSave} className="max-w-lg">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={car.title}
              onChange={(e) => setCar({ ...car, title: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={car.description}
              onChange={(e) => setCar({ ...car, description: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="tags"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tags (comma-separated):
            </label>
            <input
              type="text"
              id="tags"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={car.tags.join(", ")}
              onChange={(e) =>
                setCar({ ...car, tags: e.target.value.split(", ") })
              }
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div>
          <p className="mb-4">{car.description}</p>
          <div className="mb-4">
            {car.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mb-4 flex flex-wrap">
            {car.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Car ${index + 1}`}
                className="w-48 h-48 object-cover m-2"
              />
            ))}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleEdit}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
