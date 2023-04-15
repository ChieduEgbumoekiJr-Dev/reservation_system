import { Cuisine, Location, Price as PRICE, Review } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Price from "../../components/Price";
import { calculateReviewRatingAverage } from "../../../utils/calculateReviewRatingAverage";
import Stars from "../../components/Stars";

interface Restaurant {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
  reviews: Review[];
}

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  const renderRatingText = () => {
    const rating = calculateReviewRatingAverage(restaurant.reviews);

    if (rating > 4) return "Awesome";
    else if (rating <= 4 && rating > 3) return "Good";
    else if (rating <= 3 && rating > 0) return "Average";
    else "";
  };

  return (
    <div className="border-b flex pb-5">
      <img
        src={restaurant.main_image}
        alt=""
        className="min-w-[11rem] min-h-[9rem] max-w-[11rem] max-h-[9rem] rounded object-cover"
      />
      <div className="pl-5">
        <h2 className="text-3xl w-32 sm:w-56">{restaurant.name}</h2>
        <div className="flex flex-col	 items-start sm:flex-row">
          <Stars reviews={restaurant.reviews} />
          <p className="sm:ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex flex-col text-reg sm:flex-row">
            <Price price={restaurant.price} />
            <p className="sm:mr-4 capitalize ">{restaurant.cuisine.name}</p>
            <p className="sm:mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
