import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit, FaSave } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import BackButton from "../../../components/BackButton";
import { Staff_List_Libaray, Staff_Add_Library, Staff_Delete_Library, Staff_Update_Library } from "../../../api_Data/staff_api";
import "../../../style/pages_css/dashboard/staff_css/libraryStaff.css";

function LibraryStaff() {
  const [libraryItems, setLibraryItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: "", pdf_file: null });
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => { fetchLibraryItems(); }, []);

  const fetchLibraryItems = async () => {
    try {
      const response = await Staff_List_Libaray();
      setLibraryItems(response.message);
    } catch (error) {
      toast.error("Failed to fetch library items");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewItem({ ...newItem, [name]: files ? files[0] : value });
  };

  const handleSave = async () => {
    if (!newItem.title || (!editingItemId && !newItem.pdf_file)) {
      return toast.error("Please fill in all fields");
    }
    
    const formData = new FormData();
    formData.append("title", newItem.title);
    if (newItem.pdf_file) formData.append("pdf_file", newItem.pdf_file);
    
    try {
      editingItemId ? await Staff_Update_Library(editingItemId, formData) : await Staff_Add_Library(formData);
      toast.success(editingItemId ? "Item updated successfully" : "Item added successfully");
      setNewItem({ title: "", pdf_file: null });
      setEditingItemId(null);
      fetchLibraryItems();
    } catch (error) {
      toast.error("Failed to save library item");
    }
  };

  const handleDelete = async (id) => {
    try {
      await Staff_Delete_Library(id);
      toast.success("Item deleted successfully");
      fetchLibraryItems();
    } catch (error) {
      toast.error("Failed to delete item");
    }
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <BackButton />
      <div className="library-staff-page">
        <h2>Library </h2>
        <div className="library-form">
          <input type="text" name="title" value={newItem.title} onChange={handleChange} placeholder="Enter title" />
          <input type="file" name="pdf_file" onChange={handleChange} />
          <button onClick={handleSave}>{editingItemId ? <FaSave /> : <FaPlus />} {editingItemId ? "Update" : "Add"}</button>
        </div>

        <h2>Library Items</h2>
        {libraryItems.length === 0 ? <p>No library items added yet.</p> :
          libraryItems.map(({ id, title, pdf_file }) => (
            <div key={id} className="library-item">
              <h3>{title}</h3>
              <a href={`http://127.0.0.1:8000/${pdf_file}`} target="_blank" rel="noopener noreferrer">View PDF</a>
              <button onClick={() => { setEditingItemId(id); setNewItem({ title }); }}><FaEdit /> Edit</button>
              <button onClick={() => handleDelete(id)}><FaTrash /> Delete</button>
            </div>
          ))
        }
      </div>
    </>
  );
}

export default LibraryStaff;