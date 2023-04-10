"use client";

import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "../../hooks/useAuth";
import { AuthenticationContext } from "../../context/AuthContext";
import { Alert, CircularProgress } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);
  const { signin, signup } = useAuth();
  const { loading, data, error } = useContext(AuthenticationContext);

  useEffect(() => {
    if (isSignIn) {
      if (inputs.password && inputs.email) {
        return setDisabled(false);
      }
    } else {
      if (
        inputs.password &&
        inputs.email &&
        inputs.phone &&
        inputs.city &&
        inputs.firstName &&
        inputs.lastName
      ) {
        return setDisabled(false);
      }
    }
    setDisabled(true);
  }, [inputs]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    let payload;
    if (isSignIn) {
      payload = {
        email: inputs.email,
        password: inputs.password,
      };
      signin(payload, handleClose);
      return;
    }
    payload = {
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      email: inputs.email,
      phone: inputs.phone,
      city: inputs.city,
      password: inputs.password,
    };
    signup(payload, handleClose);
  };

  const renderContent = (signinContent: string, signupContent: string) =>
    isSignIn ? signinContent : signupContent;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <button
        className={`${renderContent(
          "bg-blue-400 text-white",
          ""
        )} border p-1 px-4 rounded mr-3`}
        onClick={handleOpen}
      >
        {renderContent("Sign in", "Sign up")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="px-2 py-24 h-[600px] flex justify-center ">
              <CircularProgress />
            </div>
          ) : (
            <div className="p-2 h-[600px]">
              {error && (
                <Alert severity="error" className="mb-4">
                  {error}
                </Alert>
              )}
              <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                <p className="text-sm">
                  {renderContent("Sign In", "Create Account")}
                </p>
              </div>
              <div className=" m-auto ">
                <h2 className="text-2xl font-light text-center">
                  {renderContent(
                    "Log Into Account",
                    "Create Your OpenTable Account"
                  )}
                </h2>
                <AuthModalInputs
                  inputs={inputs}
                  onChange={handleChange}
                  isSignIn={isSignIn}
                />
                <button
                  disabled={disabled}
                  onClick={handleClick}
                  className="uppercase bg-red-600 w-full text-white rounded p-3 text-sm mb-5 disabled:bg-gray-300"
                >
                  {renderContent("Sign In", "Create Account")}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
