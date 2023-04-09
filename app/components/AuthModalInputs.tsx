import { on } from "events";
import React from "react";

interface Props {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignIn: boolean;
}

const AuthModalInputs = ({ inputs, onChange, isSignIn }: Props) => {
  return (
    <div>
      {!isSignIn && (
        <div className="my-3 flex justify-between text-sm">
          <input
            name="firstName"
            className="border rounded p-2 py-3 w-[49%]"
            type="text"
            placeholder="First Name"
            value={inputs.firstName}
            onChange={onChange}
          />
          <input
            name="lastName"
            className="border rounded p-2 py-3 w-[49%]"
            type="text"
            placeholder="Last Name"
            value={inputs.lastName}
            onChange={onChange}
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          name="email"
          className="border rounded p-2 py-3 w-full"
          type="email"
          placeholder="Email"
          value={inputs.email}
          onChange={onChange}
        />
      </div>
      {!isSignIn && (
        <div className="my-3 flex justify-between text-sm">
          <input
            name="phone"
            className="border rounded p-2 py-3 w-[49%]"
            type="text"
            placeholder="Phone"
            value={inputs.phone}
            onChange={onChange}
          />
          <input
            name="city"
            className="border rounded p-2 py-3 w-[49%]"
            type="text"
            placeholder="City"
            value={inputs.city}
            onChange={onChange}
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          name="password"
          className="border rounded p-2 py-3 w-full"
          type="password"
          placeholder="Password"
          value={inputs.password}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default AuthModalInputs;
