import React from "react";
import "./FishForm.css";

function FishForm({ data, onChange, onAdd }) {
  return (
    <div className="add-fish-form">
      <input
        type="text"
        placeholder="Jméno rybky"
        name="name"
        value={data.name}
        onChange={onChange}
      />
      <input
        type="radio"
        id="fishVelka"
        name="size"
        value="velka"
        onChange={onChange}
        checked={data.size === "velka"}
      />
      <label htmlFor="fishVelka">Velká</label>
      <input
        type="radio"
        id="fishMala"
        name="size"
        value="mala"
        onChange={onChange}
        checked={data.size === "mala"}
      />
      <label htmlFor="fishMala">Malá</label>
      <button onClick={onAdd} className="btn-add">Přidat rybku</button>
    </div>
  );
}

export default FishForm;
