import { ITicketData } from "@/app/api/models/Ticket";
import PriorityBlock from "./priority-block";
import DeleteBlock from "./delete-block";
import Link from "next/link";
import ProgressBlock from "./progress-block";
import StatusBlock from "./status-block";

type Props = {
  ticket: ITicketData;
};

const Card = ({ ticket }: Props) => {
  return (
    <div className="bg-zinc-800 hover:bg-zinc-700 rounded-md shadow-lg p-3 mt-2 mb-4 flex flex-col">
      <div className="flex mb-3">
        <PriorityBlock priority={ticket.priority} />

        <div className="ml-auto">
          <DeleteBlock id={ticket._id} />
        </div>
      </div>

      <Link href={`/ticket/${ticket._id}`}>
        <h4>{ticket.title}</h4>
        <hr className="h-px border-0 bg-zinc-900 mb-2" />
        <p className="whitespace-pre-wrap">{ticket.description}</p>

        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-sm my-1">
              {new Date(ticket.createdAt).toLocaleDateString("tr", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <ProgressBlock progress={ticket.progress} />
          </div>
          <div className="flex items-end ml-auto">
            <StatusBlock status={ticket.status} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
