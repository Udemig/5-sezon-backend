import ValueList from "../components/value-list";
import { getStatistics } from "../utils/service";
import { FaTicket } from "react-icons/fa6";

const Home = async () => {
  const data = await getStatistics();

  return (
    <div className="flex flex-col gap-10 pt-5">
      <div className="bg-zinc-700 p-5 lg:p-10 text-zinc-300 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">{data.totalTickets}</h1>
          <p className="font-semibold">Toplam Ticket</p>
        </div>

        <FaTicket className="text-blue-500 text-5xl" />
      </div>

      <ValueList title="Kategori Özeti" arr={data.ticketsByCategory} />

      <ValueList title="Durum Özeti" arr={data.ticketsByStatus} />
    </div>
  );
};

export default Home;
