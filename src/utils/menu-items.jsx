import { MdOutlineBusAlert } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { RiShoppingBasketLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineShop } from "react-icons/ai";
import { RiFileUserLine } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";

export const menuItems = [
  {
    id: 1,
    title: "Solicitudes de recargas",
    link: "/requests",
  },
  {
    id: 2,
    title: "Repartos de hoy",

    link: "/deliveries",
  },
  {
    id: 3,
    title: "Pedidos finalizados",

    link: "/orders_completed",
  },
  {
    id: 4,
    title: "Productos",

    link: "/products",
  },
  {
    id: 5,
    title: "Repartidores",

    link: "/delivery-people",
  },
  {
    id: 6,
    title: "Mi Empresa",

    link: "/my-company",
  },
  {
    id: 7,
    title: "Clientes",

    link: "/clients",
  },
  {
    id: 8,
    title: "Cerrar sesión",

    link: "/logout",
  },
];
