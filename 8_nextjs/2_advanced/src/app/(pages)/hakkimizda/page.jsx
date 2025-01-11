import Input from "./input";

const Page = () => {
  console.log("Hakkımızda render oldu");

  return (
    <div className="p-10 text-3xl text-center my-20 border border-blue-500 ">
      <h1>Hakkımızda Sayfası</h1>

      <Input />

      <ul>
        <li>nextjs öğren</li>
        <li>typescript öğren</li>
        <li>microservice öğren</li>
      </ul>

      <br />

      <span className="server">Server Component (SSR)</span>
    </div>
  );
};

export default Page;
