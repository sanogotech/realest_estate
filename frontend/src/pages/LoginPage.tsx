import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useGlobalContext } from "../context";

type Props = {};

const LoginPage: React.FC = (props: Props) => {
  const { login } = useGlobalContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.get("email"));
    login(
      formData.get("email")?.toString(),
      formData.get("password")?.toString()
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="bg-black text-white"
          type="text"
          name="email"
          id="email"
        />
        <input
          type="password"
          name="password"
          className="bg-black text-white"
          id="password"
        />
        <button type="submit">hi</button>
      </form>
    </>
  );
};

export default LoginPage;
