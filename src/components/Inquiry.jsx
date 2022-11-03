import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { currency } from "../utils/Currency";
import Table from "./Table";
export default function Inquiry() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [ArrivalDate, SetArrivalDate] = useState();
  const [DepartDate, SetDepartDate] = useState();
  const [CurrencyCode, SetCurrencyCode] = useState();
  const [Disable, setDisable] = useState(true);
  const [SubmitDisable, setSubmitDisable] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [DataonTable, setDataonTable] = useState([]);
  const DataonINtact = async (data) => {
    console.log(data, "ds");
    await setDataonTable(data);
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

    return await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
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
    console.log(DataonTable);
    setIsShown((current) => !current);
  };

  var date = new Date();
  function toJSONLocal(date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }

  const arrivalchange = async (event) => {
    console.log(event.target.value);
    SetArrivalDate(event.target.value);
    setDisable(false);
  };
  return (
    <Fragment>
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
          type="text"
          {...register("children_qty")}
          placeholder="ChildernQuantity"
        />
        <input
          type="text"
          {...register("children_age")}
          placeholder="ChildrenAge"
        />
        <input
          type="text"
          {...register("travel_purpose")}
          placeholder="travelpurpose"
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
        <button disabled={SubmitDisable}>click</button>
      </form>

      {isShown && <Table data={[DataonTable]} />}
    </Fragment>
  );
}
