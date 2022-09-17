import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import { Doughnut, Line } from "react-chartjs-2";
import AdminSidebar from "./AdminSidebar";
import MobileAdminSidebar from "./MobileAdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../../Redux/Actions/productAction";

const Dashboard = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  // const { orders } = useSelector((state) => state.allOrders);

  // const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    // dispatch(getAllOrders());
    // dispatch(getAllUsers());
  }, [dispatch]);

  // let totalAmount = 0;
  // orders &&
  //   orders.forEach((item) => {
  //     totalAmount += item.totalPrice;
  //   });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato", "tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)", "rgb(197, 72, 49)"],
        // data: [0, totalAmount],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <>
      <MetaData title="Dashboard - Admin Panel" />

      <div className="grid grid-cols-5">
        <div className="col-span-1 hidden lg:block">
          <AdminSidebar />
        </div>
        <div className="col-span-5 lg:col-span-4 bg-white p-5 sm:p-10">
          <div className="flex items-center">
            <MobileAdminSidebar />
            <h3 className="font-semibold w-full text-center text-2xl text-[tomato]">
              Dashboard
            </h3>
          </div>

          <div className="my-8 flex flex-col gap-10">
            <div className="flex justify-center bg-white">
              <p className="text-white bg-[#4675daee] font-semibold text-lg text-center p-3 sm:p-5 w-full mx-auto">
                {/* Total Amount <br /> ₹{totalAmount} */}
                Total Amount <br /> ₹5000
              </p>
            </div>
            <div className="flex justify-center bg-white gap-8 flex-wrap">
              <div
                className="cursor-pointer text-center w-40 h-40 sm:w-32 sm:h-32 lg:w-40 lg:h-40 font-semibold text-white rounded-full flex flex-col items-center justify-center bg-[tomato]"
                onClick={() => navigate("/admin/products")}
              >
                <p>Product</p>
                <p>{products && products.length}</p>
              </div>
              <div
                className="cursor-pointer text-center w-40 h-40 sm:w-32 sm:h-32 lg:w-40 lg:h-40 font-semibold text-black rounded-full flex flex-col items-center justify-center bg-[#FFE9AE]"
                onClick={() => navigate("/admin/orders")}
              >
                <p>Orders</p>
                {/* <p>{orders && orders.length}</p> */}
                <p>3</p>
              </div>
              <div
                className="cursor-pointer text-center w-40 h-40 sm:w-32 sm:h-32 lg:w-40 lg:h-40 font-semibold text-white rounded-full flex flex-col items-center justify-center bg-[#333333]"
                onClick={() => navigate("/admin/users")}
              >
                <p>Users</p>
                {/* <p>{users && users.length}</p> */}
                <p>25</p>
              </div>
            </div>
          </div>

          <div className="mt-12 container">
            <Line data={lineState} />
          </div>

          <div className="mt-12 container">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
