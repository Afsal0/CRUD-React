import React, { useEffect, useState } from "react";
import "./AddCompany.css";
import { useNavigate } from "react-router-dom";
export default function AddCompany() {
  const navigate = useNavigate();
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    address: "",
  });
  const [addUser, setAddUser] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    designation: "",
    dob: "",
    status: "",
  });
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  const onSaveUsers = () => {
    usersList.push(userDetails);
    setUsersList([...usersList]);
    setAddUser(false);
    setUserDetails({});
  };

  const onSaveCompany = () => {
    let company = JSON.parse(localStorage.getItem("Companies"));
    debugger;
    if ([null, undefined, ""].includes(company)) {
      company = [];
    }
    company.push({ ...companyDetails, users: usersList });
    localStorage.setItem("Companies", JSON.stringify(company));
    navigate("/home");
  };
  return (
    <div className="add_company">
      <div>
        <p>Company Name</p>
        <input
          type="name"
          placeholder="Enter the company name"
          value={companyDetails?.name}
          onChange={(e) =>
            setCompanyDetails({ ...companyDetails, name: e.target.value })
          }
        />
      </div>
      <div>
        <p>Company Address</p>
        <textarea
          type="name"
          placeholder="Enter the company address"
          value={companyDetails?.address}
          onChange={(e) =>
            setCompanyDetails({ ...companyDetails, address: e.target.value })
          }
        />
      </div>

      <p>{usersList?.length > 1 ? "Users:" : "User"}</p>
      {usersList.length > 0 && (
        <div className="user_entry" style={{ textAlign: "start" }}>
          <ol>
            {usersList.map((user, i) => (
              <li>{user.firstName}</li>
            ))}
          </ol>
        </div>
      )}

      <div>
        {!addUser && <p onClick={() => setAddUser(true)}>+Add Users</p>}
      </div>
      {addUser && (
        <div className="user_entry">
          <div>
            <p>First Name</p>
            <input
              type="text"
              placeholder="Enter the First name"
              value={userDetails?.firstName}
              onChange={(e) =>
                setUserDetails({ ...userDetails, firstName: e.target.value })
              }
            />
          </div>
          <div>
            <p>Last Name</p>
            <input
              type="text"
              placeholder="Enter the Last name"
              value={userDetails?.lastName}
              onChange={(e) =>
                setUserDetails({ ...userDetails, lastName: e.target.value })
              }
            />
          </div>
          <div>
            <p>Email</p>
            <input
              type="text"
              placeholder="Enter the email"
              value={userDetails?.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
          </div>
          <div>
            <p>Designation</p>
            <input
              type="text"
              placeholder="Enter the Designation"
              value={userDetails?.designation}
              onChange={(e) =>
                setUserDetails({ ...userDetails, designation: e.target.value })
              }
            />
          </div>
          <div>
            <p>Date of birth</p>
            <input
              type="date"
              placeholder="Enter the email"
              value={userDetails?.dob}
              onChange={(e) =>
                setUserDetails({ ...userDetails, dob: e.target.value })
              }
            />
          </div>
          <div>
            <p>User Active Status</p>
            <input
              type="radio"
              id="Active"
              name="status"
              value={userDetails?.status}
              onChange={(e) =>
                setUserDetails({ ...userDetails, status: "active" })
              }
            />
            <label htmlFor="Active">Active</label>
            <br></br>
            <input
              type="radio"
              id="Inactive"
              name="status"
              value={userDetails?.status}
              onChange={(e) =>
                setUserDetails({ ...userDetails, status: "inactive" })
              }
            />
            <label htmlFor="Inactive">Inactive</label>
            <br></br>
          </div>
          <div className="save_cancel">
            <button onClick={onSaveUsers}>Save</button>
            <br></br>
            <button
              onClick={() => {
                setUserDetails({});
                setAddUser(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div>
        <button onClick={onSaveCompany}>Save</button>
        <button onClick={() => navigate("/home")}>Cancel</button>
      </div>
    </div>
  );
}
