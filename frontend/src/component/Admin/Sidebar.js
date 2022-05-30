import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";

import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <div className="tree">
        <TreeView
          className="treeView"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem className="treeItem" nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </div>
      <Link to="/admin/categories">
        <p>
          <CategoryIcon />
          Categories
        </p>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
      <Link className="logo" to="/">
        {/* <img src={logo} alt="Ecommerce" /> */}
        <i className="fab fa-firstdraft" />
        Librairie Ibn Sina
      </Link>
    </div>
  );
};

export default Sidebar;