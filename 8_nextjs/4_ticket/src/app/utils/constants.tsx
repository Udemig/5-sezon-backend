import { RxDashboard } from "react-icons/rx";
import { GrAnalytics } from "react-icons/gr";
import { RiTeamFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { HiInboxArrowDown } from "react-icons/hi2";
import { FaTicketAlt } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";

export const links = [
  {
    href: "/",
    title: "Anasayfa",
    icon: <RxDashboard />,
  },
  {
    href: "/tickets",
    title: "Ticket'lar",
    icon: <FaTicketAlt />,
  },
  {
    href: "/ticket/new",
    title: "Yeni Ticket",
    icon: <IoTicket />,
  },
  {
    href: "/teams",
    title: "Takımlar",
    icon: <RiTeamFill />,
  },
  {
    href: "/inbox",
    title: "Gelen Kutusu",
    icon: <HiInboxArrowDown />,
  },
  {
    href: "/statistics",
    title: "İstatistikler",
    icon: <GrAnalytics />,
  },
  {
    href: "/settings",
    title: "Ayarlar",
    icon: <IoMdSettings />,
  },
];
