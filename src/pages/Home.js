import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>Are you a customer or a leasor?</h1>
      <Link className="home-link" to={"/customer"}>
        Customer
      </Link>
      <Link className="home-link" to={"/leasor"}>
        Leasor
      </Link>
    </div>
  );
}
