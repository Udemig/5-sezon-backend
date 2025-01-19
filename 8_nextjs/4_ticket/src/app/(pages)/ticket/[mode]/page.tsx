// relative import
// import Form1 from "../../../components/form";

// absolute import
import { ITicketData } from "@/app/api/models/Ticket";
import Form from "@/app/components/form";
import { getTicket } from "@/app/utils/service";

type Props = {
  params: Promise<{
    mode: string;
  }>;
};

const Ticket = async ({ params }: Props) => {
  const { mode } = await params;

  // aldığımız parametreye göre sayfa hangi modda çalışacak
  const isEditMode = mode !== "new" ? true : false;

  // güncellenicek eleman
  let editItem: ITicketData | null = null;

  // eğer güncelleme modundaysak güncellenicek elemanın verilerini al
  if (isEditMode) {
    editItem = (await getTicket(mode)).ticket;
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-2xl text-zinc-500">
        {isEditMode ? "Ticket'ı Güncelle" : "Ticket Oluştur"}
      </h1>

      <Form editItem={editItem} />
    </div>
  );
};

export default Ticket;
