import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

export function Button({value, link}) {
  return (
    <Link to={link} className="nav-links">
      <button className="btn">{value}</button>
    </Link>
  );
}
