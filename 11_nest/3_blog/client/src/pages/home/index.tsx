import { FC } from "react";
import Hero from "./hero";
import Ad from "./ad";
import List from "../../components/list";

const Home: FC = () => {
  return (
    <div>
      <Hero />

      <Ad />

      <List />
    </div>
  );
};

export default Home;
