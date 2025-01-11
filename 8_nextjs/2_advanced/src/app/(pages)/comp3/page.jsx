import Link from "next/link";

const Page = () => {
  return (
    <div className="page">
      <h1>Component 3</h1>

      <br />
      <br />

      <Link href="/comp4" className="link">
        Comp4'e Git
      </Link>
    </div>
  );
};

export default Page;
