"use client";

import React, { useEffect, useState } from "react";
import useReservation from "../../../../hooks/useReservation";
import { Alert, CircularProgress } from "@mui/material";
import Link from "next/link";

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
      <div className="pt-24 flex w-full flex-col justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-36 h-36 text-green-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-4xl font-bold">You are all booked up</h1>
        <p>Enjoy your reservation</p>
        <Link
          href="/"
          className="bg-green-600 text-white border p-1 px-4 rounded mt-8 cursor-pointer"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-wrap justify-between gap-y-2 px-1">
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}
      <input
        type="text"
        className="border rounded p-3 w-full"
        placeholder="First name"
        name="bookerFirstName"
        value={inputs.bookerFirstName}
        onChange={handleChangeInputs}
      />
      <input
        type="text"
        className="border rounded p-3 w-full"
        placeholder="Last name"
        name="bookerLastName"
        value={inputs.bookerLastName}
        onChange={handleChangeInputs}
      />
      <input
        type="text"
        className="border rounded p-3 w-full"
        placeholder="Phone number"
        name="bookerPhone"
        value={inputs.bookerPhone}
        onChange={handleChangeInputs}
      />
      <input
        type="text"
        className="border rounded p-3 w-full"
        placeholder="Email"
        name="bookerEmail"
        value={inputs.bookerEmail}
        onChange={handleChangeInputs}
      />
      <input
        type="text"
        className="border rounded p-3 w-full "
        placeholder="Occasion (optional)"
        name="bookerOccasion"
        value={inputs.bookerOccasion}
        onChange={handleChangeInputs}
      />
      <input
        type="text"
        className="border rounded p-3 w-full"
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
      <p className="mt-4 text-sm ">
        By clicking “Complete reservation” you agree to the OpenTable Terms of
        Use and Privacy Policy. Standard text message rates may apply. You may
        opt out of receiving text messages at any time.
      </p>
    </div>
  );
};

export default Form;
