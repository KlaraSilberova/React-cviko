import { useState, useEffect } from "react";
import "./Aquarium.css";

const AquariumForm = ({ data }) => {
  const [tempStorage, setTempStorage] = useState({
    delka: "",
    sirka: "",
    vyska: "",
  });
  const [disable, setDisable] = useState(true);
  const [userSize, setUserSize] = useState(0);
  const [requiredSize, setRequiredSize] = useState(0);

  useEffect(() => {
    setUserSize(
      ((((tempStorage.delka / 10) * tempStorage.sirka) / 10) *
        tempStorage.vyska) /
        10
    );
  }, [tempStorage]);

  useEffect(() => {
    const shouldDisableButton = () => {
      return userSize < requiredSize;
    };
    setDisable(shouldDisableButton());
  }, [userSize, requiredSize, tempStorage]);

  const sizeRequired = () => {
    let potreba = 0;
    data.map((item) => {
      if (item.size === "velka") {
        potreba += 20;
      } else if (item.size === "mala") {
        potreba += 10;
      }
    });
    setRequiredSize(potreba);
  };

  useEffect(sizeRequired, [requiredSize]);

  const handleAquarium = (event) => {
    setTempStorage((prevAquarium) => ({
      ...prevAquarium,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClick = () => {};

  return (
    <div className="aquarium">
      <p className="popis">1 malá rybka potřebuje 10 litrů + 1 velká rybka potřebuje 20 litrů</p>
      
      <p>Tvé akvárium má: {userSize} litrů</p>
      <p>Potřebuješ: {requiredSize} litrů</p>
      <input
        type="number"
        min="1"
        placeholder="délka"
        name="delka"
        value={tempStorage.delka}
        onChange={handleAquarium}
      />
      <input
        type="number"
        min="1"
        placeholder="šířka"
        name="sirka"
        value={tempStorage.sirka}
        onChange={handleAquarium}
      />
      <input
        type="number"
        min="1"
        placeholder="výška"
        name="vyska"
        value={tempStorage.vyska}
        onChange={handleAquarium}
      />
      <button
        disabled={disable}
        onClick={handleClick}
        style={{ backgroundColor: disable ? "red" : "green" }}
      >
        Kalkulace
      </button>
    </div>
  );
};

export default AquariumForm;
