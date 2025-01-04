const Docs = async ({ params }) => {
  const { slug } = await params;

  if (slug.length >= 2)
    return (
      <h1 className="page">
        {slug[0]} deki {slug[1]} görüntüleniyor
      </h1>
    );

  return <h1 className="page">{slug[0]} görüntüleniyor</h1>;
};

export default Docs;
