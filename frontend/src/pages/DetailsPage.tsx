import React from "react";
import { RouteComponentProps } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Listing, ListingCard } from "./HomePage";
import { useEffect } from "react";

interface MatchParams {
  slug: string;
}

const DetailsPage: React.FC<RouteComponentProps<MatchParams>> = (props) => {
  const [listing, listingSet] = useState<Listing>({
    address: "",
    bedrooms: 0,
    city: "",
    home_type: "Condo",
    photo_main: "",
    price: 0,
    sale_type: "For Rent",
    slug: "",
    sqft: 0,
    state: "",
    title: "",
  });

  const fetchListing = async (): Promise<void> => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.get(
        "/api/listings/" + props.match.params.slug,
        config
      );
      listingSet(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchListing();
  }, []);
  return (
    <div>
      <ListingCard listing={listing} />
    </div>
  );
};

export default DetailsPage;
