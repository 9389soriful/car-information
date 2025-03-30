import { useEffect, useState } from "react";

const CarBody = ({ car }) => {
  const [cardDet, setCardDet] = useState([]); // state to store the car id
  const [showDet, setShowDet] = useState(null);
  const {
    car_id,
    car_name,
    car_img,
    car_price,
    car_stock,
    car_title,
    car_description,
  } = car; // destructuring the car object
  // detailsHandle function to handle the details button click
  useEffect(() => {
    fetch("./../public/Cars.json")
      .then((res) => res.json())
      .then((data) => {
        setCardDet(data);
      });
  }, []);
  const detailsHandle = (car_id) => {
    const cardDetails = cardDet.find((car) => car.car_id === car_id);
    setShowDet(cardDetails);
  };

  return (
    <div className="p-4">
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white flex flex-col gap-2">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">
            {showDet ? showDet.car_name : "Loading..."}
          </h3>
          <p className="font-semibold  text-lg ">
            {showDet && showDet.car_title}
          </p>
          <p className="text-sm font-mono text-gray-600">
            {showDet && showDet.car_description}
          </p>
          <div>
            <img src={showDet && showDet.car_img} alt="" />
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <p>Price : {showDet && showDet.car_price}</p>
              <p>Stock : {showDet && showDet.car_stock}</p>
            </div>
            <div>
              <button className="border rounded-[10px] px-8 py-2 cursor-pointer hover:bg-gray-300">
                Buy
              </button>
            </div>
          </div>
        </div>
      </dialog>
      <h1 className="text-2xl font-bold max-md:font-semibold mb-2">
        {car_name}
      </h1>
      <h2 className="text-lg font-semibold max-md:font-medium mb-2">
        {car_title}
      </h2>
      <div className="h-[334px]">
        <img src={car_img} alt={car_name} className="w-full h-full" />
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <p>Price : {car_price}</p>
        </div>
        <div>
          <button
            onClick={() => {
              detailsHandle(car_id),
                document.getElementById("my_modal_3").showModal();
            }}
            className="border border-black px-4 py-2 rounded-md cursor-pointer hover:bg-gray-300"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarBody;
