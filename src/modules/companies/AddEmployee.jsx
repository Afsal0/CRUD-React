import React, { useState } from "react";
import "./AddEmployee.css";
import axios from "axios";

export default function AddEmployee() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [showEdit, setShowEdit] = useState(true);
  const [id, setId] = useState(0);
  const addEmployee = () => {
    axios
      .post("http://localhost:3001/create", {
        name: name,
        age: age,
        country: country,
        position: position,
        wage: wage,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setEmployees([
            ...employees,
            {
              name: name,
              age: age,
              country: country,
              position: position,
              wage: wage,
            },
          ]);
        }
      });
  };

  const listEmployees = () => {
    axios.get("http://localhost:3001/getEmployees").then((res) => {
      setEmployees(res.data);
    });
  };

  const updateEmployee = () => {
    axios
      .put("http://localhost:3001/updateEmployee", {
        name: name,
        age: age,
        country: country,
        position: position,
        wage: wage,
        id: id,
      })
      .then((res) => {
        if (res.status === 200) {
          employees.map((item) => {
            if (item.id === id) {
              item.name = name;
              item.age = age;
              item.country = country;
              item.position = position;
              item.wage = wage;
            }
          });
          setEmployees([...employees]);
        }
      });

    setName("");
    setAge(0);
    setCountry("");
    setPosition("");
    setWage(0);
    setId(0);
    setShowEdit(true);
  };

  const editEmployee = (item) => {
    setName(item.name);
    setAge(item.age);
    setCountry(item.country);
    setPosition(item.position);
    setWage(item.wage);
    setId(item.id);
    setShowEdit(false);
  };

  const deleteEmployee = (dataID) => {
    axios
      .delete(`http://localhost:3001/deleteEmployee/${dataID}`)
      .then((res) => {
        if (res.status === 200) {
          setEmployees(employees.filter((item) => item.id !== dataID));
        }
      });
  };

  return (
    <div className="information">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="age">Age</label>
      <input
        type="number"
        id="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <label htmlFor="country">Country</label>
      <input
        type="text"
        value={country}
        id="country"
        onChange={(e) => setCountry(e.target.value)}
      />
      <label htmlFor="position">Position</label>
      <input
        type="text"
        id="position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <label htmlFor="salary">Wage</label>
      <input
        type="number"
        value={wage}
        id="salary"
        onChange={(e) => setWage(e.target.value)}
      />
      {showEdit ? (
        <button onClick={addEmployee}>Add Employee</button>
      ) : (
        <button onClick={updateEmployee}>Update Employee</button>
      )}
      <button onClick={listEmployees}>Show Employee</button>
      <br />
      {employees?.length > 0 &&
        employees.map((item, i) => (
          <div key={i} className="employee_info">
            <p>Name: {item.name}</p>
            <p>Age: {item.age}</p>
            <p>Country: {item.country}</p>

            <button onClick={() => editEmployee(item)}>Edit</button>

            <button onClick={() => deleteEmployee(item.id)}>Delete</button>
          </div>
        ))}
    </div>
  );
}
