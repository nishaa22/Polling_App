import React, { useEffect } from "react";
import { listUsersRequest } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const ListUsers = () => {
  const dispatch = useDispatch();
  const userList_store = useSelector((state) => state.user_list_state.data);
  useEffect(() => {
    dispatch(listUsersRequest());
  }, []);
  return (
    <>
      <h2 className="bg-black text-white text-center p-2">List of all Users</h2>
      <Card className="flex flex-wrap justify-center">
        {userList_store &&
          userList_store.data.map((val, index) => {
            if (index < 60) {
              return (
                <CardContent className="border-1 shadow-md w-1/4 m-2">
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    <b>Id : </b>
                    {val._id}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    <b>Username : </b> {val.username}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    <b>Password : </b>
                    {val.password}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    <b>Role : </b> {val.role}
                  </Typography>
                </CardContent>
              );
            }
          })}
      </Card>
    </>
  );
};

export default ListUsers;
