import React from "react";
import {
  Time,
  convertToDisplayTime,
} from "../../../../utils/convertToDisplayTime";
import { format} from "date-fns";

const Header = ({
  image,
  name,
  date,
  partySize,
}: {
  image: string;
  name: string;
  date: string;
  partySize: string;
}) => {
  const size = partySize;
  const sizeText = parseInt(partySize) === 1 ? "person" : "people";
  const [day, time] = date.split("T");
  const formatedTime = convertToDisplayTime(time as Time);
  const formatedDay = format(new Date(date), "ccc, LLL d");
  return (
    <div>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img src={image} alt="" className="w-32 h-18 rounded object-cover" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{formatedDay}</p>
            <p className="mr-6">{formatedTime}</p>
            <p className="mr-6">
              {size} {sizeText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
