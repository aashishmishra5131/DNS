import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Details from './Details';
import { Name, removeData } from './features/data/dataSlice';
import { useDispatch, useSelector } from 'react-redux';

const AdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [domainData, setDomainData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(-1);
  const [updateData, setUpdateData] = useState({
    Date: new Date(),
    Package: '',
    Amount: '',
    Expiration_date: new Date(),
    Status: '',
    Purchase: '',
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();
  const data = useSelector((state) => state.alldata);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:4000/api/v1/alldata`);
      setDomainData(result.data);
      dispatch(Name(result.data));
    };
    fetchData();
  }, [dispatch]);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/delete?_id=${_id}`);
      setDomainData((prevData) => prevData.filter((domain) => domain._id !== _id));
      dispatch(removeData(_id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleEdit = (_id) => {
    const domain = domainData.find((domain) => domain._id === _id);
    setEditId(_id);
    setIsEditing(true);
    setUpdateData(domain);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4000/api/v1/edit?_id=${editId}`, updateData);
    
      setDomainData((prevData) =>
        prevData.map((domain) => (domain._id === editId ? updateData : domain))
      );
      // Reset the editId and isEditing states
      setEditId(-1);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 p-4">
        <h1 className="text-2xl font-semibold mb-4">Admin Panel</h1>
        <ul>
          <li className="mb-2">
            <a href="/" className="hover:text-gray-300" bg-blue>
              Domain
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold mb-4 bg-slate-600 text-center">Dashboard</h2>
        <button className="font-medium bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-green-600" onClick={openModal}>
          Add Details
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={closeModal}></div>
            <div className="bg-white p-6 rounded-lg z-50 relative max-w-sm">
              <span className="absolute top-0 right-0 p-2 cursor-pointer" onClick={closeModal}>
                &times;
              </span>
              <Details />
            </div>
          </div>
        )}
        <div className="max-w-full mx-auto bg-white rounded-md overflow-hidden shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Id
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiration Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purchase
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
       {domainData.map((domain) => (
      <tr key={domain._id}>
      <td>{domain._id}</td>
      <td>
        {isEditing && editId === domain._id ? (
          <input type="text" name="Date" value={updateData.Date} onChange={handleChange} className="border border-blue-400 bg-blue-50 rounded-md px-2 py-1" />
        ) : (
          <span>{domain.Date}</span>
        )}
      </td>
      <td>
        {isEditing && editId === domain._id ? (
          <input type="text" name="Package" value={updateData.Package} onChange={handleChange} className="border border-blue-400 bg-blue-50 rounded-md px-2 py-1" />
        ) : (
          <span>{domain.Package}</span>
        )}
      </td>
      <td>
        {isEditing && editId === domain._id ? (
          <input type="text" name="Amount" value={updateData.Amount} onChange={handleChange} className="border border-blue-400 bg-blue-50 rounded-md px-2 py-1" />
        ) : (
          <span>{domain.Amount}</span>
        )}
      </td>
      <td>
        {isEditing && editId === domain._id ? (
          <input type="text" name="Expiration_date" value={updateData.Expiration_date} onChange={handleChange} className="border border-blue-400 bg-blue-50 rounded-md px-2 py-1" />
        ) : (
          <span>{domain.Expiration_date}</span>
        )}
      </td>
      <td>
        {isEditing && editId === domain._id ? (
          <input type="text" name="Status" value={updateData.Status} onChange={handleChange} className="border border-blue-400 bg-blue-50 rounded-md px-2 py-1" />
        ) : (
          <span>{domain.Status}</span>
        )}
      </td>
      <td>
        {isEditing && editId === domain._id ? (
          <input type="text" name="Purchase" value={updateData.Purchase} onChange={handleChange} className="border border-blue-400 bg-blue-50 rounded-md px-2 py-1" />
        ) : (
          <span>{domain.Purchase}</span>
        )}
      </td>
      <td>
        {isEditing && editId === domain._id ? (
          <button className="bg-green-400 text-white px-4 py-2 rounded-md" onClick={handleUpdate}>Update</button>
        ) : (
          <>
            <button className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => handleEdit(domain._id)}>Edit</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={() => handleDelete(domain._id)}>Delete</button>
          </>
        )}
      </td>
    </tr>
  ))}
</tbody>
</table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
