import React from "react";

const Box = ({ data, handleRemoveBox }) => {
  const { id, firstName, lastName, address, city } = data;

  const handleRemoveClick = () => {
    handleRemoveBox(id);
  };

  return (
    <div className="box" data-id={id}>
      <p>{firstName}</p>
      <p>{lastName}</p>
      <p>{address}</p>
      <p>{city}</p>
      <button className="btn btn-remove" onClick={handleRemoveClick}>
        Remove
      </button>
    </div>
  );
};

export default Box;
