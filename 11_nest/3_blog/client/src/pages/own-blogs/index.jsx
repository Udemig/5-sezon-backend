import { Link } from "react-router-dom";
import { useBlogs } from "../../hooks/useBlogs";
import { FaArrowRight, FaEdit, FaTrash } from "react-icons/fa";

const OwnBlogs = () => {
  const { ownBlogs, deleteBlog } = useBlogs();
  const { data, isLoading, error } = ownBlogs();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  const handleDelete = (id) => {
    if (confirm("Bu blogu silmek istediğinize emin misiniz?")) {
      deleteBlog.mutate(id);
    }
  };

  return (
    <div className="py-5 padding-x">
      <h1 className="text-2xl font-bold">Kendi Bloglarım</h1>

      <div className="grid grid-cols-1 gap-5 mt-10">
        {data?.posts.map((blog) => (
          <div key={blog._id} className="border-b border-dark-15 pb-5">
            <h2 className="font-semibold mb-2">{blog.title}</h2>
            <p className="text-zinc-400">
              {blog.content.length > 100
                ? blog.content.slice(0, 100) + "..."
                : blog.content}
            </p>

            <div className="mt-5 flex gap-5">
              <Link to={`/blog/${blog._id}`} className="blog-button">
                Blog'a Git
                <FaArrowRight className="size-3 text-yellow-55" />
              </Link>

              <Link to={`/blog/${blog._id}/edit`} className="blog-button">
                Blog'u Düzenle
                <FaEdit className="size-3 text-yellow-55" />
              </Link>

              <button
                onClick={() => handleDelete(blog._id)}
                className="blog-button"
              >
                Blog'u Sil
                <FaTrash className="size-3 text-yellow-55" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnBlogs;
