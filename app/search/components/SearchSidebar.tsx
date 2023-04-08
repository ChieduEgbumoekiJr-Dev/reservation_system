import { Price } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Item {
  id: number;
  name: string;
}

const SearchSidebar = ({
  cities,
  cuisines,
  searchParams,
}: {
  cities: Item[];
  cuisines: Item[];
  searchParams: { city?: string; cuisine?: string; price?: Price };
}) => {
  const prices = [
    {
      price: Price.CHEAP,
      label: "$",
      className: "border w-full text-reg text-center font-light rounded-l p-2",
    },
    {
      price: Price.REGULAR,
      label: "$$",
      className: "border w-full text-reg text-center font-light p-2",
    },
    {
      price: Price.EXPENSIVE,
      label: "$$$",
      className: "border w-full text-reg text-center font-light rounded-r p-2",
    },
  ];

  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col ">
        <h1 className="mb-2">Region</h1>
        {cities.map((c) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                city: c.name,
              },
            }}
            key={c.id}
            className="font-light text-reg capitalize "
          >
            {c.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((c) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                cuisine: c.name,
              },
            }}
            key={c.id}
            className="font-light text-reg capitalize "
          >
            {c.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({ price, label, className }) => (
            <Link
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  price: price,
                },
              }}
              className={className}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSidebar;
