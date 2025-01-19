"use client";

import { ITicket, ITicketData } from "@/app/api/models/Ticket";
import { createTicket, updateTicket } from "@/app/utils/service";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

type Props = {
  editItem: ITicketData | null;
};

const Form = ({ editItem }: Props) => {
  const router = useRouter();

  // form gönderilince
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // formdata ile inputlardaki verileri nesneye çevir
    const formData = new FormData(e.currentTarget);
    const ticketData = Object.fromEntries(formData.entries());

    // güncellenicek eleman yoksa:
    if (!editItem) {
      // api'a ticket oluşturma isteği at
      await createTicket(ticketData as unknown as ITicket);
    } else {
      // varsa: api'a ticket güncelleme isteği at
      await updateTicket(editItem._id, ticketData as unknown as ITicket);
    }

    // kullanıcıyı tickets sayfasına yönlendir
    router.push("/tickets");

    // sayfayı yenile
    router.refresh();
  };

  return (
    <div className="max-w-[600px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <fieldset>
          <label>Başlık</label>
          <input
            type="text"
            name="title"
            required
            defaultValue={editItem?.title}
          />
        </fieldset>

        <fieldset>
          <label>Açıklama</label>
          <textarea
            name="description"
            required
            defaultValue={editItem?.description}
          />
        </fieldset>

        <fieldset>
          <label>Kategori</label>
          <select name="category" defaultValue={editItem?.category}>
            <option>Yazılım Sorunu</option>
            <option>Donanım Sorunu</option>
            <option>Bağlantı Sorunu</option>
          </select>
        </fieldset>

        <fieldset>
          <label>Öncelik</label>
          <div className="flex gap-5">
            {new Array(5).fill("").map((i, key) => (
              <div key={key} className="flex gap-2">
                <input
                  id={String(key)}
                  value={key + 1}
                  type="radio"
                  name="priority"
                  defaultChecked={editItem?.priority === key + 1}
                />

                <label
                  htmlFor={String(key)}
                  className="font-semibold text-lg cursor-pointer"
                >
                  {key + 1}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <label>İlerleme</label>
          <input
            type="range"
            name="progress"
            defaultValue={editItem?.progress}
          />
        </fieldset>

        <fieldset>
          <label>Durum</label>
          <select name="status" defaultValue={editItem?.status}>
            <option>Beklemede</option>
            <option>Devam Ediyor</option>
            <option>Çözüldü</option>
          </select>
        </fieldset>

        <button className="bg-blue-600 mt-5 p-2 rounded-md font-semibold hover:bg-blue-700 transition">
          {editItem ? "Kaydet" : "Oluştur"}
        </button>
      </form>
    </div>
  );
};

export default Form;
