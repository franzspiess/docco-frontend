import React from 'react';
import './AddParties.css';

import MainButton from '../MainButton';

const AddParties = props => {

  const { document, handleInputChange, handleCreateNegotiation } = props;
  const { party_b_email } = document;

  const handleClick = () => handleCreateNegotiation();

  return (
    <div className="box">
      <h1>Add party to negotiation</h1>
      <form>
        <input
          className="email-input"
          type="email"
          name="party_b_email"
          value={party_b_email}
          onChange={handleInputChange}
          placeholder="email..."
        />
      </form>
      <h3>and</h3>
      <MainButton text="Create negotiation" click={handleClick} />
    </div>
  );
};

export default AddParties;