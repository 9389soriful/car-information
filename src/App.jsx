import { useEffect, useState } from "react";
import CarBody from "./components/CarBody";
// import carsData from "./../public/Cars.json";
const App = () => {
  const [cars, setCars] = useState([]);
  const [Search, setSearch] = useState("");
  useEffect(() => {
    fetch("./../public/Cars.json")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
      });
  }, []);
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const filteredCars = cars.filter(
    (car) =>
      car.car_id.toLowerCase().includes(Search.toLowerCase()) ||
      car.car_name.toLowerCase().includes(Search.toLowerCase())
  );
  return (
    <div className="App bg-white text-black">
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="font-bold text-3xl"> Cars_News</div>
        <div>
          <button className="border border-gray-600 px-4 py-2 rounded-md mr-2 cursor-pointer">
            Latest
          </button>
        </div>
      </header>
      <main>
        <div className="p-4 text-right">
          <input
            className="p-4 focus:outline-none border rounded"
            type="text"
            placeholder="Search"
            onChange={handleSearch}
            value={Search}
          />
        </div>
        <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4 p-4">
          {filteredCars.length > 0 ? (
            filteredCars.map((car, index) => {
              return <CarBody car={car} key={index} />;
            })
          ) : (
            <div className="col-span-3 text-center min-h-[75vh] flex items-center justify-center">
              <span className="loading loading-spinner loading-xl"></span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
