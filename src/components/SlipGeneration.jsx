import PropTypes from "prop-types";
import Slip from "./Slip";
import ReactToPrint from "react-to-print";
import { useRef, useState } from "react";

const SlipGeneration = ({ open, setOpen }) => {
  const slipRef = useRef();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const handleAdd = () => {
    console.log(query);

    // Split query into lines and trim whitespace
    let newArr = query.split("\n").filter((s) => s != "");
    console.log(newArr);

    // Extract details
    let name = newArr[0];
    let address = newArr[1];
    let mobile = newArr[2];

    // Process name
    let splittedName = name.split(" ");
    console.log(splittedName);
    splittedName = splittedName.filter(
      (str) => str.trim() !== "" && !str.includes(":")
    );
    console.log(splittedName);
    let finalName = splittedName
      .reduce((acc, item) => acc + " " + item, "")
      .trim();

    let splittedAddress = address.split(" ");
    console.log(splittedAddress);
    splittedAddress = splittedAddress.filter(
      (str) => str.trim() !== "" && !str.includes(":")
    );
    console.log(splittedAddress);
    let finalAddress = splittedAddress
      .reduce((acc, item) => acc + " " + item, "")
      .trim();

    let splittedPhone = mobile.split(" ");
    console.log(splittedPhone);
    splittedPhone = splittedPhone.filter(
      (str) => str.trim() !== "" && !str.includes(":")
    );
    console.log(splittedPhone);
    let finalPhone = splittedPhone
      .reduce((acc, item) => acc + " " + item, "")
      .trim();

    // Create new data object
    let newData = {
      name: finalName,
      address: finalAddress,
      mobile: finalPhone,
    };
    console.log(newData);

    // Update the data state
    setData([...data, newData]);

    // Clear the textarea and close the form
    setQuery("");
    setOpen(false);
  };

  return (
    <div>
      {open && (
        <div className="fixed gap-y-5 min-h-screen min-w-full flex-col bg-gray-200 flex items-center justify-center">
          <p className="text-xl">Please Enter the details:</p>
          <textarea
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className="min-w-[450px] min-h-[300px]"
            name=""
            id=""
          ></textarea>
          <button
            className="rounded-xl bg-green-500 px-4 py-2"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      )}
      <div className="flex gap-x-5">
        <ReactToPrint
          trigger={() => (
            <button className="rounded-xl bg-blue-500 px-4 py-2 mt-4">
              Print Slip
            </button>
          )}
          content={() => slipRef.current}
        />
        <button
          onClick={() => setOpen(true)}
          className="rounded-xl bg-green-500 px-4 py-2 mt-4"
        >
          Add Slip
        </button>
      </div>
      <div style={{ display: "none" }}>
        <Slip data={data} ref={slipRef} />
      </div>
      {data.length > 0 && (
        <div>
          {data.map((d, i) => (
            <div key={i} className="border p-4 my-2">
              <div>
                <p>
                  <strong>Name:</strong> {d.name}
                </p>
                <p>
                  <strong>Address:</strong> {d.address}
                </p>
                <p>
                  <strong>Mobile:</strong> {d.mobile}
                </p>
              </div>

              <button className="bg-green-500 text-white px-4 py-2 font-semibold rounded-lg">
                Whatsapp
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

SlipGeneration.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default SlipGeneration;
