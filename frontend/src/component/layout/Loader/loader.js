import React from "react";
import Loader from "react-js-loader";
import "./loader.css"
function loader() {
  return (
    <div className="wrapper">
      <Loader
        type="box-rotate-x"
        bgColor={"#FFD700"}
        title={"box-rotate-x"}
        size={100}
      />
      <div className={"item"}>
        <Loader
          type="box-rotate-x"
          bgColor={"#FFD700"}
          title={"box-rotate-x"}
          size={100}
        />
      </div>
      <div className={"item"}>
        <Loader
          type="box-rotate-x"
          bgColor={"#FFD700"}
          title={"box-rotate-y"}
          size={100}
        />
      </div>
      
    
    </div>
  );
}

export default loader;
