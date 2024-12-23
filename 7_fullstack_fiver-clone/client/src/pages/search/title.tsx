type Props = {
  query: string | null;
  category: string | null;
};

const Title = ({ query, category }: Props) => {
  return (
    <h1>
      {query ? (
        <p>
          <span className="font-bold">{query}</span> için arama sonuçları
        </p>
      ) : (
        <p>
          <span className="font-bold">{category}</span> kategorisi için sonuçlar
        </p>
      )}
    </h1>
  );
};

export default Title;
