import { useState } from "react";
import { axiosRestaurant } from "../utils/axiosConfig";

export default function useReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createReservation = async ({
    slug,
    partySize,
    day,
    time,
    bookerFirstName,
    bookerLastName,
    bookerEmail,
    bookerPhone,
    bookerRequest,
    bookerOccasion,
    setDidBook,
  }: {
    slug: string;
    partySize: number;
    day: string;
    time: string;
    bookerFirstName: string;
    bookerLastName: string;
    bookerEmail: string;
    bookerPhone: string;
    bookerRequest: string;
    bookerOccasion: string;
    setDidBook: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    setLoading(true);
    try {
      const body = {
        bookerFirstName,
        bookerLastName,
        bookerEmail,
        bookerPhone,
        bookerRequest,
        bookerOccasion,
      };
      const params = {
        day,
        time,
        partySize,
      };
      const response = await axiosRestaurant.post(`/${slug}/reserve`, body, {
        params,
      });
      setLoading(false);
      setDidBook(true);
      return;
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errors.join(", "));
    }
  };

  return {
    loading,
    error,
    createReservation,
  };
}
