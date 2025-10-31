import { Link } from "react-router-dom";
import {
  FaPenAlt,
  FaRegCalendarAlt,
  FaRegUserCircle,
  FaRegHeart,
  FaRegComment,
  FaArrowRight,
} from "react-icons/fa";

import b1 from "../assets/images/blog1.avif";
import b2 from "../assets/images/blog2.avif";
import b3 from "../assets/images/blog3.avif";

export default function BlogSection() {
  const data = [
    {
      id: 1,
      title: "Top 7 Budget-Friendly Travel Tips in Bangladesh",
      excerpt:
        "Discover how to travel across Bangladesh without breaking the bank. From cheap accommodations to affordable street food, here’s a complete budget guide...",
      author: "Siam khan",
      date: "2023-05-15",
      likes: 58,
      comments: 14,
      image: b1,
    },
    {
      id: 2,
      title: "Traveler’s Guide to Exploring Cox’s Bazar",
      excerpt:
        "From the world’s longest sandy beach to local seafood delicacies, here’s everything you need to know before planning your trip to Cox’s Bazar...",
      author: "Rocky Ali",
      date: "2023-04-22",
      likes: 42,
      comments: 9,
      image: b2,
    },
    {
      id: 3,
      title: "Dhaka City Guide: History, Culture & Food",
      excerpt:
        "Old Dhaka is a treasure chest of culture, history, and mouth-watering street food. Here’s a complete guide to experiencing the city like a local...",
      author: "Sagor Haque",
      date: "2023-03-10",
      likes: 39,
      comments: 12,
      image: b3,
    },
  ];

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto">
      {/* Blog Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <FaPenAlt className="mr-2" />
          Traveler's Stories
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Discover{" "}
          <span className="text-emerald-600">Traveler's Experiences</span>
        </h2>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {data.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="p-6">
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <FaRegUserCircle className="mr-2 text-emerald-500" />
                <span className="mr-4 font-medium">{blog.author}</span>
                <FaRegCalendarAlt className="mr-2 text-emerald-500" />
                <span>{blog.date}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {blog.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-sm">
                  <div className="flex items-center mr-4">
                    <FaRegHeart className="mr-1 text-red-400" />
                    <span>{blog.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <FaRegComment className="mr-1 text-blue-400" />
                    <span>{blog.comments}</span>
                  </div>
                </div>
                <Link
                  to={`/blog/${blog.id}`}
                  className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center text-sm"
                >
                  Read More
                  <FaArrowRight className="ml-1 text-xs" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FaPenAlt className="text-3xl text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No blog posts yet
          </h3>
          <p className="text-gray-600 mb-4">
            Be the first to share your travel experience!
          </p>
        </div>
      )}
    </div>
  );
}
