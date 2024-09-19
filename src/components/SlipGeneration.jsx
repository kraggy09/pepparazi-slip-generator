import PropTypes from "prop-types";
import Slip from "./Slip";
import ReactToPrint from "react-to-print";
import { useRef, useState } from "react";

const SlipGeneration = ({ open, setOpen }) => {
  const slipRef = useRef();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [money, setMoney] = useState({
    sale: 0,
    delivery: 0,
    advance: 0,
  });

  function sendMessage(details) {
    const { sale, delivery, advance } = details;
    const message = `
  Pepperazzi Order Update
  
  Hello,
  
  I am from Pepperazzi Luxury. You had placed an order with us. Your item(s) is packed, please share your address so can we can get it dispatched.
  
  Sale - ${sale}
  Advance - ${advance}
  Delivery - ${delivery}
  
  Balance - ${sale - advance + Number(delivery)}
  
  The balance amount needs to be paid to the delivery executive in cash.
    `;

    // URL encode the message
    const encodedMessage = encodeURIComponent(message.trim());

    // Construct the WhatsApp URL
    const phoneNumber = details.mobile; // Replace with actual phone number
    const whatsappUrl = `https://api.whatsapp.com/send?phone=91${phoneNumber}&text=${encodedMessage}`;

    // Open the WhatsApp URL in a new tab/window
    window.open(whatsappUrl, "_blank");
  }

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
      sale: money.sale,
      advance: money.advance,
      delivery: money.delivery,
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

          <div>
            <p>
              Sales:{" "}
              <input
                type="text"
                onChange={(e) => {
                  let newMoney = { ...money, sale: e.target.value };
                  setMoney(newMoney);
                }}
                value={money.sale}
              />
            </p>
          </div>
          <div>
            <p>
              Advance:{" "}
              <input
                type="text"
                onChange={(e) => {
                  let newMoney = { ...money, advance: e.target.value };
                  setMoney(newMoney);
                }}
                value={money.advance}
              />
            </p>
          </div>
          <div>
            <p>
              Delivery:{" "}
              <input
                type="text"
                onChange={(e) => {
                  let newMoney = { ...money, delivery: e.target.value };
                  setMoney(newMoney);
                }}
                value={money.delivery}
              />
            </p>
          </div>
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
                <p>
                  <strong>Sale:</strong> {d.sale}
                </p>
                <p>
                  <strong>Advance:</strong> {d.advance}
                </p>
                <p>
                  <strong>Delivery:</strong> {d.delivery}
                </p>
                <p>
                  <strong>Total:</strong>{" "}
                  {d.sale - d.advance + Number(d.delivery)}
                </p>
              </div>

              <button
                onClick={() => {
                  sendMessage(d);
                }}
                className="bg-green-500 text-white px-4 py-2 font-semibold rounded-lg"
              >
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
