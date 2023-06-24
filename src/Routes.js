import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Home from "./modules/companies/Home";
import AddCompany from "./modules/companies/AddCompany";
import AddEmployee from "./modules/companies/AddEmployee";

const Routes = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" element={<AddEmployee />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/company" element={<AddCompany />} />
          {/* <Route path="/product">
       <Product />
      </Route>
      <Route path="/category">
       <Category />
      </Route>
      <Route path="/cart">
       <Cart />
      </Route> */}
        </Switch>
      </Router>
    </div>
  );
};
export default Routes;
