// bu component'ın client component olmasını sağlar
"use client";

const Page = () => {
  console.log("İletişim sayfası render edildi");

  return (
    <div className="p-10 text-3xl text-center my-20">
      <h1>İletişim Sayfası</h1>

      <span className="client">Client Component (CSR)</span>
    </div>
  );
};

export default Page;
