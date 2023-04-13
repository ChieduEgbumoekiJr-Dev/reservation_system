"use client";

import React, { useEffect, useState } from "react";
import useReservation from "../../../../hooks/useReservation";
import { CircularProgress } from "@mui/material";

const Form = ({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: string;
}) => {
  const [inputs, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerEmail: "",
    bookerPhone: "",
    bookerRequest: "",
    bookerOccasion: "",
  });
  const [disabled, setDisabled] = useState<boolean>(false);
  const { error, loading, createReservation } = useReservation();
  const [day, time] = date.split("T");
  const [didBook, setDidBook] = useState<boolean>(false);

  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerEmail &&
      inputs.bookerPhone
    ) {
      return setDisabled(false);
    }
    return setDisabled(true);
  }, [inputs]);

  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () =>
    await createReservation({
      slug,
      partySize: parseInt(partySize),
      day,
      time,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerEmail: inputs.bookerEmail,
      bookerPhone: inputs.bookerPhone,
      bookerRequest: inputs.bookerRequest,
      bookerOccasion: inputs.bookerOccasion,
      setDidBook,
    });

  if (didBook) {
    return (
      <div>
        <h1>You are all booked up</h1>
        <p>Enjoy your reservation</p>
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="First name"
        name="bookerFirstName"
        value={inputs.bookerFirstName}
        onChange={handleChangeInputs}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Last name"
        name="bookerLastName"
        value={inputs.bookerLastName}
        onChange={handleChangeInputs}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Phone number"
        name="bookerPhone"
        value={inputs.bookerPhone}
        onChange={handleChangeInputs}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Email"
        name="bookerEmail"
        value={inputs.bookerEmail}
        onChange={handleChangeInputs}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Occasion (optional)"
        name="bookerOccasion"
        value={inputs.bookerOccasion}
        onChange={handleChangeInputs}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Requests (optional)"
        name="bookerRequest"
        value={inputs.bookerRequest}
        onChange={handleChangeInputs}
      />
      <button
        onClick={handleClick}
        disabled={disabled || loading}
        className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
      >
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          "Complete reservation"
        )}
      </button>
      <p className="mt-4 text-sm">
        By clicking “Complete reservation” you agree to the OpenTable Terms of
        Use and Privacy Policy. Standard text message rates may apply. You may
        opt out of receiving text messages at any time.
      </p>
    </div>
  );
};

export default Form;
