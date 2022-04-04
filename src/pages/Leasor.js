import React from "react";

export default function LeasorPage() {
  return (
    <div>
      <h1>This is the leasor page.</h1>
      <form className="rental-form">
        <label>
          Title:
          <input />
        </label>

        <label>
          Price:
          <input />
        </label>

        <label>
          Location:
          <input />
        </label>

        <label>
          Size:
          <input />
        </label>

        <label>
          Bedrooms:
          <input />
        </label>

        <label>
          Bathrooms:
          <input />
        </label>

        <button>Submit</button>
      </form>
    </div>
  );
}
