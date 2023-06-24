import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState(
    JSON.parse(localStorage.getItem("Companies")) || []
  );

  const onDeleteCompany = (item) => {
    let companyIndex = companies.findIndex((data) => data.name === item.name);
    if (companyIndex >= 0) {
      companies.splice(companyIndex, 1);
      localStorage.setItem("Companies", JSON.stringify(companies));
      setCompanies([...companies]);
    }
  };

  return (
    <div className="home">
      <div className="header">Effy</div>

      <div className="list_of_companies">
        {companies &&
          companies.length > 0 &&
          companies.map((item, i) => (
            <div className="company_details">
              <p>{item?.name}</p>
              <p>Edit</p>
              <p onClick={() => onDeleteCompany(item)}>Delete</p>
            </div>
          ))}
      </div>
      <div className="add_company" onClick={() => navigate("/company")}>
        +Add Company
      </div>
    </div>
  );
}
