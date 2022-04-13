import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./SearchPage.css";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />

      <form className="searchBox" onSubmit={searchSubmitHandler}>
        {/* <div className="returnBtn">
          <Link to="/">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </Link>
        </div> */}
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
