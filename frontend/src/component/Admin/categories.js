import React, { Fragment, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col,  Button } from "react-bootstrap";
import "./categories.css";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import {
  getAllCategory,
  addCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
  clearErrors,
} from "../../actions/categoryAction";
import CheckboxTree from "react-checkbox-tree";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload,
} from "react-icons/io";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import AddCategory from "./addCategory"






const Categories = ({ history }, props) => {
  const dispatch = useDispatch(); 
    const category = useSelector((state) => state.category);
 const [categoryId, setCategoryId] = useState("");
   const [checked, setChecked] = useState([]);
   const [expanded, setExpanded] = useState([]);
   const [checkedArray, setCheckedArray] = useState([]);
   const [expandedArray, setExpandedArray] = useState([]);
   const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
   const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  useEffect(() => {

    
    dispatch(getAllCategory());

  }, []);
  


  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };
  return (
    <Fragment>
      <MetaData title={`Categories - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="CategoriesContainer" >
          <h1 id="CategoriesHeading">ALL CATEGORIES</h1>
          <select 
            className="form-control"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option>select category</option>
            {createCategoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          
          <AddCategory />
        </div>
      </div>
    </Fragment>
  );
};

export default Categories;
