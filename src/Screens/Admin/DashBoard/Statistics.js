import { Box, Table, TableBody, TableCell, TableRow } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Statistics = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const getMapSlPostByTag = async () => {
      try {
        const response = await axios.get(
          `/tag/getMapSlPostByTag/${Cookies.get("sessionCookie")}`
        );

        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMapSlPostByTag();
  }, []);

  const rows = Object.entries(data).map(([name, quantity]) =>
    createData(name, quantity)
  );

  function createData(name, quantity) {
    return { name, quantity };
  }
  return (
    <Box
      sx={{ marginTop: 2, width: "80%", overflow: "auto", maxHeight: "490px" }}
    >
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Statistics;
