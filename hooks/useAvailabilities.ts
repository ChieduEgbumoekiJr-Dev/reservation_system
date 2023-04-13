import { useState } from "react";
import { axiosRestaurant } from "../utils/axiosConfig";
import { Time } from "../utils/convertToDisplayTime";

export default function useAvailabilities() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<
    | {
        time: Time;
        available: boolean;
      }[]
    | null
  >(null);

  const fetchAvailabilities = async ({
    slug,
    partySize,
    day,
    time,
  }: {
    slug: string;
    partySize: number;
    day: string;
    time: string;
  }) => {
    setLoading(true);
    try {
      const params = {
        day,
        time,
        partySize,
      };
      const response = await axiosRestaurant.get(`/${slug}/availability`, {
        params,
      });
      setLoading(false);
      setData(response.data);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errors.join(","));
    }
  };

  return {
    loading,
    data,
    error,
    fetchAvailabilities,
  };
}
