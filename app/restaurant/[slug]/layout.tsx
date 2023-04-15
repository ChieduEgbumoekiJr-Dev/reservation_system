import React from "react";
import Header from "./components/Header";

const RestaurantLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  return (
    <>
      <Header name={params.slug} />
      <div className="flex flex-col md:flex-row md:m-auto w-full items-start -mt-11">
        {children}
      </div>
    </>
  );
};

export default RestaurantLayout;
