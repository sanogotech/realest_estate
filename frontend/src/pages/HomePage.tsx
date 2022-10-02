import React, { useEffect, useState } from "react";
import axios from "axios";

type Props = {};

interface Listing {
  title: string;
  address: string;
  city: string;
  state: string;
  price: number;
  sale_type: "For Sale" | "For Rent";
  home_type: "Condo" | "Townhouse" | "House";
  bedrooms: number;
  sqft: number;
  photo_main: string;
  slug: string;
}

const ListingCard: React.FC<{ listing: Listing }> = ({ listing }) => {
  const {
    title,
    address,
    city,
    state,
    price,
    sale_type,
    home_type,
    bedrooms,
    sqft,
    photo_main,
    slug,
  } = listing;
  return (
    <div className="bg-slate-900 p-8 text-white flex flex-col">
      <h1>{title}</h1>
      <img src={photo_main} alt={slug} />
      <p>
        {address} - {city} - {state}
      </p>
      <p>${price}</p>
      <p>{sale_type}</p>
      <p>{home_type}</p>
      <p>{bedrooms} bedrooms</p>
      <p>{sqft}</p>
    </div>
  );
};

const HomePage: React.FC = (props: Props) => {
  const [listings, listingsSet] = useState<Listing[]>([]);

  const fetchAllListings = async () => {
    try {
      const response = await axios.get("/api/listings/");
      listingsSet(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllListings();
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-6 p-8">
        {listings.map((listing) => (
          <ListingCard listing={listing} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
