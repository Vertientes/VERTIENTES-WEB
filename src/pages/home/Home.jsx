import { useDispatch } from "react-redux";
import "../../components/menu/cardMenuItemStyles.css";
import { useEffect } from "react";
import CardMenuItem from "../../components/menu/CardMenuItem";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineFireTruck } from "react-icons/md";
import { MdOutlineBusAlert } from "react-icons/md";
import { PiListChecksDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/layout/NavBar";

export const Home = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 1,
      title: "Pedidos de hoy",
      description: "Aqui veras tus pedidos del dia.",
      icon: <LuClipboardList />,
    },
    {
      id: 2,
      title: "Solicitudes de recargas",
      description:
        "Aqui veras las solicitudes de clientes que ya han abonado su pedido",
      icon: <MdOutlineBusAlert />,
    },
    {
      id: 3,
      title: "Repartos de hoy",
      description: "Aqui se agregarán los repartos del dia.",
      icon: <MdOutlineFireTruck />,
    },
    {
      id: 4,
      title: "Pedidos finalizados",
      description: "Aqui verás los pedidos finalizados en su totalidad",
      icon: <PiListChecksDuotone />,
    },
  ];
  const handleItemClick = (item) => {
    if (item.id == 1) {
      return navigate("/orders");
    }

    if (item.id == 2) {
      return navigate("/requests");
    }

    if (item.id == 3) {
      return navigate("/deliveries");
    }

    if (item.id == 4) {
      return navigate("/orders_completed");
    }
  };

  return (
    <>
      <NavBar />
      <div className="container">
        {menuItems.map((item) => (
          <CardMenuItem
            key={item.id}
            item={item}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>
    </>
  );
};
