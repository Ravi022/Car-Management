"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCar, setEditingCar] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // In a real app, you would fetch the user's cars from your API here
    setCars([
      {
        id: 1,
        title: "Toyota Camry",
        description: "Reliable sedan",
        tags: ["sedan", "toyota"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 2,
        title: "Honda Civic",
        description: "Compact car",
        tags: ["compact", "honda"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 3,
        title: "Ford F-150",
        description: "Powerful truck",
        tags: ["truck", "ford"],
        image: "/placeholder.svg?height=200&width=300",
      },
    ]);
  }, []);

  const filteredCars = cars.filter(
    (car) =>
      car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleLogout = () => {
    // In a real app, you would handle logout here
    router.push("/");
  };

  const handleUpdate = (car) => {
    setEditingCar(car);
  };

  const handleDelete = (id) => {
    // In a real app, you would call your API to delete the car
    setCars(cars.filter((car) => car.id !== id));
  };

  const handleSaveEdit = (updatedCar) => {
    // In a real app, you would call your API to update the car
    setCars(cars.map((car) => (car.id === updatedCar.id ? updatedCar : car)));
    setEditingCar(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Your Cars</h1>
        <div>
          <Button asChild className="mr-4">
            <Link href="/cars/new">Add New Car</Link>
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      <Input
        type="text"
        placeholder="Search cars..."
        className="w-full mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCars.map((car) => (
          <Card key={car.id}>
            <CardHeader>
              <CardTitle>{car.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={car.image}
                alt={car.title}
                width={300}
                height={200}
                className="w-full object-cover mb-4 rounded-md"
              />
              <p className="mb-2">{car.description}</p>
              <div className="mb-2">
                {car.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/cars/${car.id}`}>View Details</Link>
              </Button>
              <div>
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-2"
                  onClick={() => handleUpdate(car)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(car.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      {editingCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Car</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const updatedCar = {
                    ...editingCar,
                    title: formData.get("title"),
                    description: formData.get("description"),
                    tags: formData
                      .get("tags")
                      .split(",")
                      .map((tag) => tag.trim()),
                    image: formData.get("image"),
                  };
                  handleSaveEdit(updatedCar);
                }}
                className="space-y-4"
              >
                <Input
                  name="title"
                  defaultValue={editingCar.title}
                  placeholder="Title"
                  required
                />
                <Input
                  name="description"
                  defaultValue={editingCar.description}
                  placeholder="Description"
                  required
                />
                <Input
                  name="tags"
                  defaultValue={editingCar.tags.join(", ")}
                  placeholder="Tags (comma-separated)"
                  required
                />
                <Input
                  name="image"
                  defaultValue={editingCar.image}
                  placeholder="Image URL"
                  required
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingCar(null)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
