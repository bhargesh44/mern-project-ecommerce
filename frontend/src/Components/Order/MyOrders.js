import React, { useEffect } from "react";
import MetaData from "../Layout/MetaData";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import { useAlert } from "react-alert";
import { clearErrors, myOrders } from "../../Redux/Actions/orderAction";
import Loader from "../Layout/Loader";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      headerClassName: "text-white bg-[tomato]",
      minWidth: 300,
      flex: 1,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      headerClassName: "text-white bg-[tomato]",
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "text-[green]"
          : "text-[red]";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      headerClassName: "text-white bg-[tomato]",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      headerClassName: "text-white bg-[tomato]",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      headerClassName: "text-white bg-[tomato]",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon color="primary" />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);
  return (
    <>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="container pb-5 box-border flex flex-col min-h-[calc(100vh-237px)]">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="!bg-white"
            autoHeight
          />

          <Typography
            className="text-center !text-lg p-2 box-border text-[tomato]"
            style={{
              transition: "all 0.5s",
              backgroundColor: "rgb(44, 44, 44)",
            }}
          >
            {user.name}'s Orders
          </Typography>
        </div>
      )}
    </>
  );
};

export default MyOrders;
