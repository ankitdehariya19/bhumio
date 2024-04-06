import React from "react";
import useAuth from "../services/useAuth";
const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="flex ">
      Private
      <button
        onClick={() => {
          logout();
        }}
      >
        {" "}
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
