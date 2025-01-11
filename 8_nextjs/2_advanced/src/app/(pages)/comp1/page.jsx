import Link from "next/link";

const Comp1 = () => {
  return (
    <div className="page">
      <h1>Component 1</h1>

      <br />
      <br />

      <Link href="/comp1/comp2" className="link">
        Comp2'ye Git
      </Link>
    </div>
  );
};

export default Comp1;
