import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import AdminSidebar from "./AdminSidebar";
import MobileAdminSidebar from "./MobileAdminSidebar";
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from "../../Redux/Actions/orderAction";
import { DELETE_ORDER_RESET } from "../../Redux/Constants/orderConstants";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const OrderList = () => {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 250,
      flex: 0.5,
      headerClassName: "text-white bg-[tomato]",
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.3,
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
      minWidth: 100,
      flex: 0.3,
      headerClassName: "text-white bg-[tomato]",
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 100,
      flex: 0.3,
      headerClassName: "text-white bg-[tomato]",
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      headerClassName: "text-white bg-[tomato]",
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon color="success" />
            </Link>

            <Button
              onClick={() => {
                setDeleteId(params.getValue(params.id, "id"));
                deleteOrderToggle();
              }}
            >
              <DeleteIcon color="error" />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <>
      <MetaData title={`ALL ORDERS  - Admin`} />

      <div className="grid grid-cols-5">
        <div className="col-span-1 hidden lg:block">
          <AdminSidebar />
        </div>
        <div className="col-span-5 lg:col-span-4 bg-white p-5 sm:p-10">
          <div className="flex items-center mb-10 justify-start">
            <MobileAdminSidebar />
            <h3 className="font-semibold text-center text-xl sm:text-2xl text-[tomato] w-full items-center">
              All Orders
            </h3>
          </div>
          <div className="box-border">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="!bg-white"
              autoHeight
            />
          </div>
        </div>
        <Dialog
          open={open}
          onClose={deleteOrderToggle}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle className="text-[tomato] !font-semibold">
            Delete Order
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="!text-black ">
              Do you want to delete this order???
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={deleteOrderToggle}
              color="warning"
              variant="contained"
            >
              No
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteOrderHandler(deleteId)}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default OrderList;
