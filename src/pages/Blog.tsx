import { Link } from "react-router-dom";
import {
  FaPenAlt,
  FaRegCalendarAlt,
  FaRegUserCircle,
  FaRegHeart,
  FaRegComment,
} from "react-icons/fa";

export default function BlogSection() {
  const data = [
    {
      id: 1,
      title: "Exploring the Sundarbans: A Magical Experience",
      excerpt:
        "My incredible journey through the world's largest mangrove forest and its amazing wildlife...",
      author: "Sarah Johnson",
      date: "2023-05-15",
      likes: 42,
      comments: 8,
      image:
        "https://images.unsplash.com/photo-1584697964358-3e16ca2e7459?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    },
    {
      id: 2,
      title: "Cox's Bazar: The Longest Beach I've Ever Seen",
      excerpt:
        "Spent a week enjoying the breathtaking views and local seafood cuisine at this amazing beach...",
      author: "Michael Chen",
      date: "2023-04-22",
      likes: 28,
      comments: 5,
      image:
        "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80",
    },
    {
      id: 3,
      title: "Cultural Treasures of Old Dhaka",
      excerpt:
        "Exploring the rich history and vibrant street food scene in Bangladesh's capital city...",
      author: "Amina Rahman",
      date: "2023-03-10",
      likes: 35,
      comments: 12,
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    },
  ];

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div>
        <h1> blog nie title </h1>
        <h1> short text</h1>
      </div>
      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <FaRegUserCircle className="mr-1" />
                <span className="mr-4">{blog.author}</span>
                <FaRegCalendarAlt className="mr-1" />
                <span>{blog.date}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                <Link
                  to={`/blog/${blog.id}`}
                  className="hover:text-emerald-600"
                >
                  {blog.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <div className="flex items-center mr-4">
                  <FaRegHeart className="mr-1" />
                  <span>{blog.likes}</span>
                </div>
                <div className="flex items-center">
                  <FaRegComment className="mr-1" />
                  <span>{blog.comments}</span>
                </div>
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
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg flex items-center mx-auto">
            <FaPenAlt className="mr-2" />
            Write Your First Post
          </button>
        </div>
      )}
    </div>
  );
}
