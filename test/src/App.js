import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Box from "./components/Box";
import Form from "./components/FormComponent";

const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/data");
      setData(response.data);
    } catch (error) {
      console.error("Greška:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Provera da li su sva polja popunjena
    if (
      formData.firstName === "" ||
      formData.lastName === "" ||
      formData.address === "" ||
      formData.city === ""
    ) {
      setErrorMessage("Molimo popunite sva polja.");
      return;
    }

    const newData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      city: formData.city,
    };

    try {
      await axios.post("http://localhost:5000/api/data", newData);
      setData((prevState) => [...prevState, newData]);
      setFormData({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
      });
      setErrorMessage("");
    } catch (error) {
      console.error("Greška:", error);
      setErrorMessage("Došlo je do greške");
    }
  };

  const handleRemoveBox = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/data/${id}`);
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="app-container">
      <Form
        formData={formData}
        handleFormChange={handleFormChange}
        handleFormSubmit={handleFormSubmit}
        errorMessage={errorMessage}
      />

      <div className="box-container">
        {data.map((item, index) => (
          <Box key={index} data={item} handleRemoveBox={handleRemoveBox} />
        ))}
      </div>
    </div>
  );
};

export default App;
