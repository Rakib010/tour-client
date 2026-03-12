import { Link } from "react-router-dom";
import {
  FaPenAlt,
  FaRegCalendarAlt,
  FaRegUserCircle,
  FaRegHeart,
  FaRegComment,
  FaArrowRight,
} from "react-icons/fa";

import SectionHeader from "./SectionHeader";
import { homeBlogPosts } from "@/constants/home/blogPosts";

export default function BlogSection() {
  return (
    <div className="py-12 max-w-[1280px] mx-auto px-4 sm:px-6">
      <SectionHeader
        badge="Traveler's Stories"
        title={
          <>
            Discover{" "}
            <span className="text-primary">Traveler's Experiences</span>
          </>
        }
        description="Read inspiring stories from fellow travelers"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {homeBlogPosts.map((blog) => (
          <div
            key={blog.id}
            className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/20 transition-all duration-300 group"
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
              <div className="flex items-center text-muted-foreground text-sm mb-3">
                <FaRegUserCircle className="mr-2 text-primary" />
                <span className="mr-4 font-medium">{blog.author}</span>
                <FaRegCalendarAlt className="mr-2 text-primary" />
                <span>{blog.date}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {blog.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-muted-foreground text-sm">
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
                  className="text-primary hover:text-primary/90 font-medium flex items-center text-sm"
                >
                  Read More
                  <FaArrowRight className="ml-1 text-xs" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {homeBlogPosts.length === 0 && (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <FaPenAlt className="text-3xl text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No blog posts yet
          </h3>
          <p className="text-muted-foreground mb-4">
            Be the first to share your travel experience!
          </p>
        </div>
      )}
    </div>
  );
}
