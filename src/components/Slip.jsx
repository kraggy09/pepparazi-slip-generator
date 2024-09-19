import { forwardRef } from "react";

const Slip = forwardRef((props, ref) => {
  const { data } = props;
  return (
    <div ref={ref}>
      {data &&
        data.map((d) => {
          return (
            <div
              key={d.phone}
              className="w-[794px] flex flex-col gap-y-8 items-center  text-xl h-[561px] bg-slate-100"
            >
              <img
                src="https://static.wixstatic.com/media/a09e70_52a5354eddd94c068c22c87965e4a2a1~mv2.png/v1/fill/w_289,h_94,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/pepperazzi%20luxury%20logo%20green%20bg.png"
                alt="Pepperazzi Luxury Logo"
              />
              <h1 className="text-3xl underline italic font-semibold">
                Order Summary
              </h1>
              <div className=" mr-6 flex gap-y-2 flex-col max-w-[300px] ml-auto">
                <p className="font-bold text-xl">To,</p>

                <p className="grid grid-cols-4 max-w-[300px]">
                  <span className="col-span-1 font-semibold">Name: </span>
                  <span className="col-span-3">{d.name}</span>
                </p>
                <p className="grid grid-cols-4 max-w-[300px]">
                  <span className="col-span-1 font-semibold">Addr: </span>
                  <span className="col-span-3">{d.address}</span>
                </p>
                <p className="grid grid-cols-4 max-w-[300px]">
                  <span className="col-span-1 font-semibold">Phone: </span>
                  <span className="col-span-3">{d.mobile}</span>
                </p>
              </div>
              <div className="ml-6 flex flex-col gap-y-2 max-w-[300px] mr-auto">
                <p className="font-bold">From,</p>
                <p>PeppeRazzi Luxury</p>
                <p className="max-w-[300px]">7003800177</p>
              </div>
            </div>
          );
        })}
    </div>
  );
});

// Adding display name for better debugging
Slip.displayName = "Slip";

export default Slip;
