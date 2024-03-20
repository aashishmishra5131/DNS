import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
function Details() {
  const [domainData, setDomainData] = useState({
    Date: new Date(),
    Package: '',
    Amount: '',
    Expiration_date: new Date(),
    Status: '',
    Purchase:'',
  });
  const [showDetails, setShowDetails] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (name, value) => {
    setDomainData({
      ...domainData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setShowDetails(false); 
      setShowMessage(true);
      const result=await axios.post(`http://localhost:4000/api/v1/domain`,domainData)
      console.log(result,"result data");
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="form-container">
      {showMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">Details added successfully!</span>
        </div>
      )}
      {showDetails && (
        <>
          <h1 className="p-3 rounded-lg w-4/5 h-50% text-center ">Add Details</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block" htmlFor="Date">Date:</label>
            <DatePicker
                selected={domainData.Date}
                onChange={(date) => handleChange("Date", date)}
                dateFormat="yyyy-MM-dd"
                className="border border-gray-300 px-1 py-1 rounded-md w-full"
              />
          <label className="block" htmlFor="PACKAGE">Package:</label>
          <select
             id="Package"
             name="Package"
             value={domainData.Package}
             onChange={(e) => handleChange("Package", e.target.value)}
             required
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
           >
             <option value="">Select a package</option>
             <option value="Basic">Basic</option>
             <option value="Standard">Standard</option>
             <option value="Premium">Premium</option>
             </select>
            <label className="block" htmlFor="AMOUNT">Amount:</label>
            <input
              type="text"
              id="amount"
              name="Amount"
              value={domainData.Amount}
              onChange={(e) => handleChange("Amount", e.target.value)}
              required
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            />
            <label className="block" htmlFor="EXPIRATION_DATE">Expiration_date:</label>
            <DatePicker
                selected={domainData.Expiration_date}
                onChange={(date) => handleChange("Expiration_date", date)}
                dateFormat="yyyy-MM-dd"
                className="border border-gray-300 px-1 py-1 rounded-md w-full"
              />
            <label className="block" htmlFor="STATUS">Status:</label>
            <select
             id="Status"
             name="Status"
             value={domainData.Status}
             onChange={(e) => handleChange("Status", e.target.value)}
             required
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
           >
             <option value="Active">Active</option>
             <option value="Deactive">Deactive</option>
             </select>
             <label className="block" htmlFor="PURCHASE">Purchase:</label>
             <select
             id="Purchase"
             name="Purchase"
             value={domainData.Purchase}
             onChange={(e) => handleChange("Purchase", e.target.value)}
             required
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
           >
             <option value="HDFC">HDFC</option>
             <option value="SBI">SBI</option>
             <option value="PNB">PNB</option>
             <option value="UBI">UBI</option>
             <option value="CBI">CBI</option>
             </select>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
              Add
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Details;
