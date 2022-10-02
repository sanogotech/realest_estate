import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

interface Props {}

const NavBar: React.FC = (props: Props) => {
  const { state, dispatch } = useGlobalContext();
  const { is_authenticated } = state;

  const auth_links = (
    <>
      <li>
        <span
          className="cursor-pointer"
          onClick={() => dispatch({ type: "LOGOUT" })}
        >
          Logout
        </span>
      </li>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/listings">Listings</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
    </>
  );

  const guest_links = (
    <>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </>
  );

  return (
    <nav className="p-6 bg-slate-900 flex text-white items-center font-poppins">
      <Link className="text-3xl font-bold" to="/">
        Realest Estate
      </Link>
      <div className="ml-auto text-xl">
        <ul className="flex gap-4">
          {is_authenticated ? auth_links : guest_links}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
