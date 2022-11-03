import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { currency } from "../utils/Currency";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import Modal from "react-bootstrap/Modal";
import PopupDescription from "./DescriptionPopup";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function Inquiry() {
  const [ArrivalDate, SetArrivalDate] = useState();
  const [DepartDate, SetDepartDate] = useState();
  const [CurrencyCode, SetCurrencyCode] = useState();
  const [Disable, setDisable] = useState(true);
  const [SubmitDisable, setSubmitDisable] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [DataonTable, setDataonTable] = useState([]);
  const [show, setShow] = useState(false);
  const [modaldata, setmodaldata] = useState();
  const handleClose = () => setShow(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleShow = async (data, image, hotel_name_trans, url, price) => {
    const options = {
      method: "GET",
      url: "https://apidojo-booking-v1.p.rapidapi.com/properties/get-description",
      params: {
        hotel_ids: data,
        languagecode: "en-us",
      },
      headers: {
        "X-RapidAPI-Key": "f3b9c80997msh251f038da25364fp13acfdjsn9971553ef46f",
        "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com",
      },
    };

    await axios
      .request(options)
      .then(async function (response) {
        setmodaldata({
          data: response.data,
          image: image,
          HotelName: hotel_name_trans,
          BookNowURL: url,
          Price: price,
        });
        await setShow(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const ApiSubmission = async (data) => {
    const options = {
      method: "GET",
      url: "https://apidojo-booking-v1.p.rapidapi.com/properties/list",
      params: {
        offset: "1",
        arrival_date: data.arrival_date,
        departure_date: data.departure_date,
        guest_qty: data.GuestQty,
        dest_ids: "-3712125",
        room_qty: data.room_qty,
        search_type: data.searchtype,
        children_qty: data.ChildernQuantity,
        children_age: data.ChildrenAge,
        search_id: "none",
        price_filter_currencycode: CurrencyCode,
        order_by: data.orderby,
        languagecode: "en-us",
        travel_purpose: data.travelpurpose,
      },
      headers: {
        "X-RapidAPI-Key": "f3b9c80997msh251f038da25364fp13acfdjsn9971553ef46f",
        "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com",
      },
    };
    SetDepartDate(data.departure_date);

    return await axios
      .request(options)
      .then(function (response) {
        setDataonTable(response.data.result);
        return response.data.result;
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const onSubmit = async (data, event) => {
    setSubmitDisable(true);
    await ApiSubmission(data);
    setDataonTable(await ApiSubmission(data));
    setSubmitDisable(false);
    setIsShown((current) => !current);
  };

  var date = new Date();
  function toJSONLocal(date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }

  const arrivalchange = async (event) => {
    SetArrivalDate(event.target.value);
    setDisable(false);
  };
  return (
    <Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h2>Detail</h2>
        </Modal.Header>
        <PopupDescription data={modaldata} />
      </Modal>

      <div className="query">
        <form
          id="form"
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            {...register("Hotelname")}
            placeholder="Hotel Name"
          />
          <input type="text" {...register("Address")} placeholder="Address" />
          <input
            type="text"
            {...register("guest_qty")}
            placeholder="GuestQunatity"
          />
          <input
            type="text"
            {...register("room_qty")}
            placeholder="RoomQunatity"
          />

          <input
            type="date"
            {...register("arrival_date")}
            onChange={arrivalchange}
            min={toJSONLocal(date)}
          />

          <input
            type="date"
            {...register("departure_date")}
            min={ArrivalDate}
            disabled={Disable}
          />
          <Autocomplete
            id="country-select-demo"
            onChange={(event, value) => SetCurrencyCode(value)}
            sx={{ width: 300 }}
            options={currency}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.code} {option.name} ({option.symbol})
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose Currency Code"
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
          />
          <label htmlFor="children_qty">Number OF Children</label>
          <select
            id="children_qty"
            name="children_qty"
            {...register("children_qty")}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <label htmlFor="travel_purpose">Travel Purpose</label>
          <select
            id="travel_purpose"
            name="travel_purpose"
            {...register("travel_purpose")}
          >
            <option value="leisure">leisure</option>
            <option value="business">business</option>
          </select>
          <button disabled={SubmitDisable}>click</button>
        </form>
      </div>

      <div className="Table">
        <h3>
          {DataonTable.length == 0
            ? " "
            : `${DataonTable.length} Entries Found`}{" "}
        </h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px blue" }}
        >
          <Table
            stickyHeader
            aria-label="simple table"
            sx={{ minWidth: 650, overflow: "hidden" }}
          >
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Image</StyledTableCell>
                <StyledTableCell align="left">Hotel Name</StyledTableCell>
                <StyledTableCell align="left">City</StyledTableCell>
                <StyledTableCell align="left">Notice</StyledTableCell>
                <StyledTableCell align="left">Detail</StyledTableCell>
                <StyledTableCell align="left" />
              </StyledTableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {DataonTable.map((row) => (
                <StyledTableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img src={row.main_photo_url} />
                  </TableCell>
                  <TableCell align="left">{row.hotel_name_trans}</TableCell>
                  <TableCell align="left">{row.city}</TableCell>
                  <TableCell align="left">{row.urgency_room_msg}</TableCell>
                  <TableCell align="left">
                    <button
                      variant="primary"
                      className="productListEdit"
                      onClick={() =>
                        handleShow(
                          row.hotel_id,
                          row.main_photo_url,
                          row.hotel_name_trans,
                          row.url,
                          row.min_total_price
                        )
                      }
                    >
                      View
                    </button>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Fragment>
  );
}
