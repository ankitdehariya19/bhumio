import React, { useState } from "react";
import {
  BsArrowLeftCircleFill,
  BsChevronBarDown,
  BsDatabaseFillLock,
} from "react-icons/bs";
import { iconUrl } from "../url/constants";
import { BiSolidDashboard, BiSolidHelpCircle } from "react-icons/bi";
import { RiShoppingCartFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { PiToolboxFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setsubmenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const Menus = [
    {
      title: "Dashboard",
      icon: <BiSolidDashboard />,
      submenu: true,
      submenuItems: [
        { title: "Home", path: "/" },
        { title: "Overview", path: "/overview" },
        { title: "Analytics", path: "/analytics" },
        { title: "Reports", path: "/reports" },
        { title: "Notifications", path: "/notifications" },
      ],
    },
    {
      title: "Master Data",
      icon: <BsDatabaseFillLock />,
      submenu: true,
      submenuItems: [
        { title: "Companies", path: "/companies" },
        { title: "Regions", path: "/regions" },
        { title: "Branches", path: "/branches" },
        { title: "Access Roles", path: "/access-roles" },
        { title: "Users", path: "/users" },
        { title: "Brands", path: "/brands" },
        { title: "Product Categories", path: "/productCategories" },
        { title: "Products", path: "/products" },
        { title: "Suppliers", path: "/suppliers" },
        { title: "Customers", path: "/customers" },
        { title: "Salesman", path: "/salesman" },
      ],
    },
    {
      title: "Transactions",
      icon: <RiShoppingCartFill />,
      submenu: true,
      submenuItems: [
        { title: "Purchases", path: "/purchases" },
        { title: "Sales Orders", path: "/sales-orders" },
        { title: "Returns", path: "/returns" },
        { title: "Deliveries", path: "/deliveries" },
        { title: "Stock Operations", path: "/stock-operations" },
        { title: "Stock Opname", path: "/stock-opname" },
        { title: "Closing Stock", path: "/closing-stock" },
      ],
    },
    {
      title: "Settings",
      icon: <IoMdSettings />,
      submenu: true,
      submenuItems: [
        { title: "Company Settings", path: "/company-settings" },
        { title: "User Management", path: "/user-management" },
        { title: "Role Management", path: "/role-management" },
        { title: "Preferences", path: "/preferences" },
      ],
    },
    {
      title: "Utilities",
      icon: <PiToolboxFill />,
      submenu: true,
      submenuItems: [
        { title: "Import Data", path: "/import-data" },
        { title: "Export Data", path: "/export-data" },
        { title: "Data Backup", path: "/data-backup" },
        { title: "Data Restore", path: "/data-restore" },
      ],
    },
    {
      title: "Help & Support",
      icon: <BiSolidHelpCircle />,
      submenu: true,
      submenuItems: [
        { title: "FAQ", path: "/faq" },
        { title: "Documentation", path: "/documentation" },
        { title: "Contact Support", path: "/contact-support" },
      ],
    },
  ];

  const handleMenuClick = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } min-h-screen max-h-full duration-300 p-5 pt-4 bg-gray-900 relative mx-2 rounded-md`}
    >
      <BsArrowLeftCircleFill
        onClick={() => setOpen(!open)}
        className={`absolute cursor-pointer rounded-full -right-3 top-6 w-6 h-6 bg-white border text-dark-purple hover:bg-gray-300 hover:text-dark-purple transition duration-300 ${
          !open && "rotate-180"
        }`}
      />

      <div className="flex gap-x-4 items-center">
        <img src={iconUrl} alt="SVG Icon" className=" rounded-md w-10 h-auto" />
        <h1
          className={`text-white origin-left font-medium text-xl duration-300 ${
            !open && "scale-0"
          }`}
        >
          Bhumio
        </h1>
      </div>
      <div>
        <ul className="pt-6 ">
          {Menus.map((menu, index) => (
            <React.Fragment key={index}>
              <li
                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2 ${
                  !open ? "flex items-center justify-center " : ""
                } ${menu.spacing ? "mt-9" : "mt2"}`}
                onClick={() => handleMenuClick(index)}
              >
                <span className="text-2xl block float-left">{menu.icon}</span>
                <span
                  className={` text-base font-medium flex-1 duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
                {menu.submenu && open && (
                  <BsChevronBarDown
                    className={`${submenuOpen && "rotate-180"}`}
                    onClick={() => {
                      setsubmenuOpen(!submenuOpen);
                    }}
                  />
                )}
              </li>
              {menu.submenu && open && (
                <BsChevronBarDown
                  key={`submenu-chevron-${index}`}
                  className={`${activeMenu === index && "rotate-180"}`}
                />
              )}
              {menu.submenu && activeMenu === index && open && (
                <ul key={`submenu-ul-${index}`}>
                  {menu.submenuItems.map((submenuItems, subIndex) => (
                    <li
                      key={`submenu-item-${subIndex}`}
                      className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md px-10"
                    >
                      <Link to={submenuItems.path}>{submenuItems.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

