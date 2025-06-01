import React from "react";

const categories = [
  "Graphic Design",
  "Web Development",
  "Tutoring",
  "Event Planning",
  "Content Creation",
];

export default function CategoriesSection() {
  return (
    <section id="categories" className="bg-gray-50 py-20 px-6 text-center">
      <h3 className="text-3xl font-bold text-gray-900 mb-12">
        Popular Categories
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category, idx) => (
          <span
            key={idx}
            className="bg-indigo-100 text-indigo-700 px-6 py-2 rounded-full font-medium hover:bg-indigo-200 transition"
          >
            {category}
          </span>
        ))}
      </div>
    </section>
  );
}
