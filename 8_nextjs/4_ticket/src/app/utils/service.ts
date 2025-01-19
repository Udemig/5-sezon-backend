import { ITicket, ITicketData } from "../api/models/Ticket";

const baseURL = "http://localhost:3000";

export const createTicket = async (ticketData: ITicket): Promise<void> => {
  try {
    await fetch(`${baseURL}/api/tickets`, {
      method: "POST",
      body: JSON.stringify(ticketData),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("Bir sorun oluştu");
  }
};

type GetTicketsResponse = {
  message: string;
  tickets: ITicketData[];
};

export const getTickets = async (): Promise<GetTicketsResponse> => {
  const res = await fetch(`${baseURL}/api/tickets`);

  if (!res.ok) {
    throw new Error("Ticket verileri alınamadı");
  }

  return res.json();
};

export const deleteTicket = async (id: string): Promise<void> => {
  const res = await fetch(`${baseURL}/api/tickets/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Ticket verileri alınamadı");
  }
};

type GetTicketResponse = {
  message: string;
  ticket: ITicketData;
};

export const getTicket = async (id: string): Promise<GetTicketResponse> => {
  const res = await fetch(`${baseURL}/api/tickets/${id}`);

  if (!res.ok) {
    throw new Error("Ticket verisi alınamadı");
  }

  return res.json();
};

export const updateTicket = async (
  id: string,
  data: ITicket
): Promise<void> => {
  const res = await fetch(`${baseURL}/api/tickets/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Ticket güncellenirken bir hata oluştu");
  }
};

type GetStatisticsType = {
  totalTickets: number;
  ticketsByCategory: {
    "Bağlantı Sorunu": number;
    "Donanım Sorunu": number;
    "Yazılım Sorunu": number;
  };
  ticketsByStatus: {
    Çözüldü: number;
    Beklemede: number;
    "Devam Ediyor": number;
  };
  averagePriority: number;
  averageProgress: number;
};

export const getStatistics = async (): Promise<GetStatisticsType> => {
  const res = await fetch(`${baseURL}/api/statistics`);

  if (!res.ok) {
    throw new Error("İstatistik verisi alınamadı");
  }

  return res.json();
};
