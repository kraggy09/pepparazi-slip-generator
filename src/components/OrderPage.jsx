import { Link, useParams } from "react-router-dom";
import SlipGeneration from "./SlipGeneration";
import { useState } from "react";

const OrderPage = () => {
  const params = useParams();
  console.log(params.id);
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen min-w-full">
      <nav className="flex items-center gap-x-12 justify-center">
        <Link
          to="/"
          className="shadow-xl text-xl hover:cursor-pointer hover:scale-110 items-center px-4 py-2 rounded-xl transition-transform duration-300 ease-in-out"
        >
          Go Back
        </Link>
        <h2 className="text-2xl">{params.id + " Order Selected"}</h2>
      </nav>
      <div>
        <SlipGeneration open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default OrderPage;
