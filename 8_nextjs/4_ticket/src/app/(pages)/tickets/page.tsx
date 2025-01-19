import Card from "@/app/components/card";
import { getTickets } from "@/app/utils/service";

const Tickets = async () => {
  const { tickets } = await getTickets();

  // ticket'ların kategorilerini benzersiz bir dizi olarak tan.
  const categories = [...new Set(tickets.map((i) => i.category))].sort();

  return (
    <div>
      {categories.map((category, key) => (
        <div key={key} className="mb-4">
          <h2 className="mb-2 text-xl text-zinc-400 font-semibold">
            {category}
          </h2>

          <div>
            {tickets
              .filter((ticket) => ticket.category === category)
              .map((ticket, key) => (
                <Card key={key} ticket={ticket} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tickets;
