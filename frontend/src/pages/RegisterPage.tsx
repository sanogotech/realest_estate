import React from "react";
import { Redirect } from "react-router-dom";
import { useGlobalContext } from "../context";

type Props = {};

const RegisterPage: React.FC = (props: Props) => {
  const { register, state } = useGlobalContext();
  const { is_authenticated } = state;
  if (is_authenticated) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    register(
      formData.get("name") as string,
      formData.get("email") as string,
      formData.get("password") as string,
      formData.get("password2") as string
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-600 flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="input"
            placeholder="name"
            type="text"
            name="name"
            id="name"
            required
          />
          <input
            className="input"
            placeholder="email"
            type="text"
            name="email"
            id="email"
            required
          />
          <input
            required
            placeholder="password"
            type="password"
            name="password"
            className="input"
            id="password"
          />
          <input
            required
            placeholder="confirm password"
            type="password"
            name="password2"
            className="input"
            id="password2"
          />

          <button className="btn self-start" type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
