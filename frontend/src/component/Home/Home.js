import React, { useEffect } from "react";
import { Fragment } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import MetaData from "../layout/MetaData";
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/loader";
import { useAlert } from "react-alert";
// const product = {
//   name: "Cable Chargeur Type C",
//   images: [
//     {
//       url: " https://via.placeholder.com/300x400.png/0000FF/808080?Text=casastore.com",
//     },
//   ],
//   price: "3DT",
//   _id: "123456",
//   Currency: "$"
// };

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />
          <div className="banner">
            {/* <p>Nouveau Produit</p> */}
            <h1>TROUVEZ DES LIVRES INCROYABLES CI-DESSOUS</h1>

            <a href="#container">
              <button>
                Défiler <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Decouvrez nos Produits</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => <ProductCard product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
