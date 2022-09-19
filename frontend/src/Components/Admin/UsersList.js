import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearErrors,
  deleteUser,
  getAllUsers,
} from "../../Redux/Actions/userAction";
import MetaData from "../Layout/MetaData";
import AdminSidebar from "./AdminSidebar";
import MobileAdminSidebar from "./MobileAdminSidebar";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DELETE_USER_RESET } from "../../Redux/Constants/userConstants";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };
  const deleteUserToggle = () => {
    open ? setOpen(false) : setOpen(true);
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
      alert.success(message);
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted, message, navigate]);

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      minWidth: 180,
      flex: 0.8,
      headerClassName: "text-white bg-[tomato]",
    },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
      headerClassName: "text-white bg-[tomato]",
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
      headerClassName: "text-white bg-[tomato]",
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      headerClassName: "text-white bg-[tomato]",
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "text-[green]"
          : "text-[red]";
      },
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
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon color="success" />
            </Link>

            <Button
              onClick={() => {
                setDeleteId(params.getValue(params.id, "id"));
                deleteUserToggle();
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

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });
  return (
    <>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="grid grid-cols-5">
        <div className="col-span-1 hidden lg:block">
          <AdminSidebar />
        </div>
        <div className="col-span-5 lg:col-span-4 bg-white p-5 sm:p-10">
          <div className="flex items-center mb-10 justify-start">
            <MobileAdminSidebar />
            <h3 className="font-semibold text-center text-xl sm:text-2xl text-[tomato] w-full items-center">
              All Users
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
          onClose={deleteUserToggle}
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
              onClick={deleteUserToggle}
              color="warning"
              variant="contained"
            >
              No
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteUserHandler(deleteId)}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default UsersList;
