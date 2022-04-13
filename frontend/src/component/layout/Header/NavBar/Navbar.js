import React, { useState } from "react";
import { Button } from "./Button";
// import Search from "../../../Product/Search";
// import Search from "./Search/Search";
// import Search from "./Search/search"
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";

function Navbar() {
  const [click, setClick] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <i className="fab fa-firstdraft" />
          CasaStore
        </Link>

        <div class Name="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <div className="nav-search">{/* <Search /> */}</div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link
              to="/products"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Produits
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/search" className="nav-links" onClick={closeMobileMenu}>
              Recherche
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/contact-us"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Contacts
            </Link>
          </li>
          <li className="search-item nav-item">
            <Link to="/search" className="nav-links" onClick={closeMobileMenu}>
              Recherche
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/cart" className="nav-links" onClick={closeMobileMenu}>
              {cartItems.length === 0
                ? (

                  
              <i className="fas fa-shopping-cart"></i>
                
                ) 
                : `DT ${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}`}
            </Link>
          </li>
          {/* <li>
            <Link
              to="/sign-in"
              className="nav-links-mobile"
              onClick={closeMobileMenu}
            >
              Se connecter
            </Link>
          </li> */}
          {isAuthenticated ? (
            <li className="nav-item" onClick={closeMobileMenu}>
              <Button value={user.name} link={"account"} />
            </li>
          ) : (
            <li className="nav-item" onClick={closeMobileMenu}>
              <Button value={"Se connecter"} link={"login"} />
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
