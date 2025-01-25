import DashboardValue from "../components/dasboard-value";
import ValueList from "../components/value-list";
import { getStatistics } from "../utils/service";
import { FaFire } from "react-icons/fa";
import { FaTicket } from "react-icons/fa6";
import { IoMdCheckmarkCircle as Check } from "react-icons/io";

const Home = async () => {
  const data = await getStatistics();

  return (
    <div className="flex flex-col gap-10 pt-5">
      <div className="flex flex-col xl:flex-row max-xl:gap-10 w-full gap-5">
        <DashboardValue
          title="Toplam Ticket"
          value={data.totalTickets}
          icon={<FaTicket className="text-blue-500" />}
        />
        <DashboardValue
          title="Ortalama Öncelik"
          value={data.averagePriority}
          icon={<FaFire className="text-red-500" />}
        />
        <DashboardValue
          title="Ortalama İlerleme"
          value={data.averageProgress + "%"}
          icon={<Check className="text-green-500" />}
        />
      </div>

      <ValueList title="Kategori Özeti" arr={data.ticketsByCategory} />

      <ValueList title="Durum Özeti" arr={data.ticketsByStatus} />
    </div>
  );
};

export default Home;
