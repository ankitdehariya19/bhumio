import React, { useEffect } from "react";
import { MdCheckCircle, MdShoppingCart, MdLocalShipping } from "react-icons/md"; // Import icons
import ItemCounter from "../components/cart/ItemCounter";
import useUserService from "../services/useUserService";
import Roles from "./Roles";

const Home = () => {
  const { totalUsers } = useUserService();

  useEffect(() => {
    console.log(totalUsers);
  }, [totalUsers]);

  return (
    <div className="flex flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid items-start gap-4 md:grid-cols-[1fr_1fr_1fr] lg:px-10">
          <ItemCounter
            itemName="Users"
            initialCount={totalUsers}
            icon={MdCheckCircle}
          />
          <ItemCounter
            itemName="Products"
            initialCount={98}
            icon={MdShoppingCart}
          />
          <ItemCounter
            itemName="Orders"
            initialCount={220}
            icon={MdLocalShipping}
          />
        </div>
        <div className="">
          <Roles />
        </div>
      </main>
    </div>
  );
};

export default Home;
