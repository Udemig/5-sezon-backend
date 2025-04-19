import { useBlogs } from "../../hooks/useBlogs";
import Post from "./post";

const List: React.FC = () => {
  const { blogs } = useBlogs();
  const { isLoading, error, data } = blogs();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  // Gönderilerin benzersiz etiketlerini al
  const tags = [
    "Hepsi",
    ...new Set(data?.posts.map((blog) => blog.tags).flat()),
  ];

  return (
    <>
      <div className="flex  gap-2 border border-dark-15  py-10 lg:py-15 xl:py-20 padding-x overflow-x-auto">
        {tags.map((tag) => (
          <div
            key={tag}
            className={`flex-1 text-center capitalize bg-dark-15 border-[0.5px] border-dark-15 text-grey-60 p-[10px] lg:p-[18px] 2xl:p-[30px] rounded-md cursor-pointer min-w-[120px] small-text ${
              tag === "Hepsi" && "bg-zinc-900 text-white"
            }`}
          >
            {tag}
          </div>
        ))}
      </div>

      <div className="min-h-[50vh] py-5 lg:py-10 xl:py-15">
        {data?.posts.map((blog) => (
          <Post key={blog._id} post={blog} />
        ))}
      </div>
    </>
  );
};

export default List;
