import { Link } from "react-router-dom";

const Home = () => (
  <div className="min-h-screen min-w-full flex-col flex items-center justify-center">
    <img
      src="https://static.wixstatic.com/media/a09e70_52a5354eddd94c068c22c87965e4a2a1~mv2.png/v1/fill/w_289,h_94,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/pepperazzi%20luxury%20logo%20green%20bg.png"
      alt="Pepperazzi Luxury Logo"
    />
    <div className="flex gap-x-7 mt-6">
      <Link
        to="/Kolkata"
        className="shadow-xl text-2xl hover:cursor-pointer flex justify-center hover:scale-110 items-center min-w-56 min-h-24 rounded-xl transition-transform duration-300 ease-in-out"
      >
        Kolkata Order
      </Link>
      <Link
        to="/Outside"
        className="shadow-xl text-2xl flex justify-center hover:cursor-pointer hover:scale-110 items-center min-w-56 min-h-24 rounded-xl transition-transform duration-300 ease-in-out"
      >
        Outside Order
      </Link>
    </div>
  </div>
);
export default Home;
