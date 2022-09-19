import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Inventory2Icon from "@mui/icons-material/Inventory2";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const setActiveLink = (path) => {
    return location?.pathname === path
      ? "!text-[#eb4034] !hover:text-[#eb4034] !font-bold"
      : "";
  };

  return (
    <div className="sidebar bg-white flex flex-col py-5 sm:py-20">
      <div
        className={`${setActiveLink(
          "/admin/dashboard"
        )} text-[#0000007e] font-semibold p-4 hover:text-[tomato] hover:scale-110`}
        style={{ transition: "all 0.5s" }}
        onClick={() => navigate("/admin/dashboard")}
      >
        <p className="flex items-center">
          <DashboardIcon className="mr-3" /> Dashboard
        </p>
      </div>

      <div
        className={`${setActiveLink("/admin/products")} ${setActiveLink(
          "/admin/product"
        )} ${setActiveLink(
          `/admin/product/${id}`
        )} text-[#0000007e] font-semibold p-4 hover:text-[tomato] hover:scale-110`}
        style={{ transition: "all 0.5s" }}
        onClick={() => navigate("/admin/products")}
      >
        <p className="flex items-center">
          <Inventory2Icon className="mr-3" />
          Products
        </p>
      </div>

      <div
        className={`${setActiveLink("/admin/orders")} ${setActiveLink(
          `/admin/order/${id}`
        )} text-[#0000007e] font-semibold p-4 hover:text-[tomato] hover:scale-110`}
        style={{ transition: "all 0.5s" }}
        onClick={() => navigate("/admin/orders")}
      >
        <p className="flex items-center">
          <ListAltIcon className="mr-3" />
          Orders
        </p>
      </div>
      <div
        className={`${setActiveLink("/admin/users")} ${setActiveLink(
          `/admin/user/${id}`
        )} text-[#0000007e] font-semibold p-4 hover:text-[tomato] hover:scale-110`}
        style={{ transition: "all 0.5s" }}
        onClick={() => navigate("/admin/users")}
      >
        <p className="flex items-center">
          <PeopleIcon className="mr-3" /> Users
        </p>
      </div>
      <div
        className={`${setActiveLink(
          "/admin/reviews"
        )} text-[#0000007e] font-semibold p-4 hover:text-[tomato] hover:scale-110`}
        style={{ transition: "all 0.5s" }}
        onClick={() => navigate("/admin/reviews")}
      >
        <p className="flex items-center">
          <RateReviewIcon className="mr-3" />
          Reviews
        </p>
      </div>
    </div>
  );
};

export default AdminSidebar;
