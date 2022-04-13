import React, { useState, useEffect } from "react";
import "./search.css";
import $ from "jquery";

function SearchBar({ history }) {
  useEffect(() => {
    $(".default_option").click(function () {
      $(".dropdown ul").addClass("active");
    });

    $(".dropdown ul li").click(function () {
      var text = $(this).text();
      $(".default_option").text(text);
      $(".dropdown ul").removeClass("active");
      console.log(text);
    });
  }, []);
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
    <form className="searchBox" onSubmit={searchSubmitHandler}>
      <div class="wrapper">
        <div class="search_box">
          <div class="dropdown">
            <div class="default_option">All</div>
            <ul>
              <li>All</li>
              <li>Recent</li>
              <li>Popular</li>
            </ul>
          </div>
          <div class="search_field">
            <input
              type="text"
              class="input"
              placeholder="Recherche Produit ..."
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
