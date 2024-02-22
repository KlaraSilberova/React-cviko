import { useState, useRef } from "react";
import Toggler from "./components/Toggler/Toggler";
import ListOfFishes from "./components/Fish/ListOfFishes";
import FishForm from "./components/Fish/FishForm";
import Aquarium from "./components/Aquarium";
import rawData from "./rawData.json";
import "./App.css";

const App = () => {
  const [listOfFish, setListOfFish] = useState(rawData.ryba);
  const [newFish, setNewFish] = useState({
    id:
      listOfFish.length > 0
        ? Math.max(...listOfFish.map((ryba) => ryba.id)) + 1
        : 1,
    name: "",
    size: "velka",
  });

  const handleChange = (event) => {
    const updatedFish = { ...newFish, [event.target.name]: event.target.value };
    setNewFish(updatedFish);
  };

  const handleAdd = () => {
    setListOfFish((listOfFish) => {
      return [...listOfFish, newFish];
    });
    const newFishId = newFish.id + 1;
    const updatedFish = {
      id: newFishId,
      name: "",
      size: "velka",
    };
    setNewFish(updatedFish);
  };
  const handleDelete = (idToDelete) => {
    setListOfFish(listOfFish.filter((fish) => fish.id !== idToDelete));
  };
  const [activeTab, setActiveTab] = useState(1);

  const handleChoose = (source) => {
    switch (source) {
      case "ListOfFishes": {
        setActiveTab(1);
        break;
      }
      case "Aquarium": {
        setActiveTab(2);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="App">
      <Toggler active={activeTab} onChoose={handleChoose} />
      {activeTab === 1 && (
        <>
          <ListOfFishes data={listOfFish} onDelete={handleDelete} />
          <FishForm data={newFish} onChange={handleChange} onAdd={handleAdd} />
        </>
      )}
      {activeTab === 2 && (
        <>
          <Aquarium data={listOfFish} />
        </>
      )}
    </div>
  );
};
export default App;
