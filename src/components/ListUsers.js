import React, { useEffect, useState } from "react";
import { listUsersRequest } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
const ListUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const pageSize = 10;
  const userList = useSelector((state) => state.user_list_state);
  const userList_store = useSelector((state) => state.user_list_state.data);
  let userListArray = userList_store?.data || [];

  const paginationFunc = (userListArray, length) => {
    let arr = [],
      i = 0,
      n = userListArray.length;
    while (i < n) {
      arr.push(userListArray.slice(i, (i += length)));
    }
    return arr;
  };

  useEffect(() => {
    dispatch(listUsersRequest());
  }, []);

  useEffect(() => {
    if (userListArray.length > 0) {
      setPaginatedData(paginationFunc(userListArray, pageSize));
    }
  }, [userListArray]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber + 1);
  };


  return (
    <>
      <h2 className="bg-black text-white text-center p-2">List of all Users</h2>
      <div className="flex justify-center mt-3">
        <Button
          type="button"
          class="text-gray-900 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500 hover:bg-gradient-to-br
           focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg 
           text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
      <Card className="flex flex-wrap justify-center">
        {paginatedData.length > 0 &&
          paginatedData[currentPage].map((val) => {
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
          })}
        <Box>
          <Pagination
            count={userListArray.length / pageSize}
            onChange={(e, pageNumber) => handlePagination(pageNumber)}
          />
        </Box>
      </Card>
      {userList.isLoading ? <LinearProgress /> : ""}
    </>
  );
};

export default ListUsers;
