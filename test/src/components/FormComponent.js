import React from 'react';

const Form = ({
  formData,
  handleFormChange,
  handleFormSubmit,
  errorMessage,
}) => {
  return (
    <div className="form-container">
      <form onSubmit={handleFormSubmit}>
        <div className="form-row">
          <label>Firstname:</label>
          <input
            type="text"
            name="firstName"
            required
            placeholder="Firstname"
            value={formData.firstName}
            onChange={handleFormChange}
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label>Lastname:</label>
          <input
            type="text"
            name="lastName"
            required
            placeholder="Lastname"
            value={formData.lastName}
            onChange={handleFormChange}
          />
        </div>

        <div className="form-row">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            required
            placeholder="Address"
            value={formData.address}
            onChange={handleFormChange}
          />
        </div>

        <div className="form-row">
          <label>City:</label>
          <input
            type="text"
            name="city"
            required
            placeholder="City"
            value={formData.city}
            onChange={handleFormChange}
          />
        </div>

        <div className="form-row">
          <button type="submit" className="btn btn-primary">
            Insert
          </button>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Form;
