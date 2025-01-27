import React, { useState } from "react";
import "../../../style/pages_css/dashboard/staff_css/libraryStaff.css"; // External CSS
import { FaPlus, FaTrash, FaEdit, FaSave } from "react-icons/fa"; // Icons for add, delete, edit, and save
import BackButton from "../../../components/BackButton";

function LibraryStaff() {
  const [libraryItems, setLibraryItems] = useState([]); // State to store library items
  const [newItem, setNewItem] = useState({
    title: "",
    author: "",
    category: "",
    quantity: "",
  }); // State for new item input
  const [editingItemId, setEditingItemId] = useState(null); // State to track which item is being edited

  // Handle input change for new/updated item
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  // Add new library item
  const handleAddItem = () => {
    if (newItem.title && newItem.author && newItem.category && newItem.quantity) {
      setLibraryItems([...libraryItems, { ...newItem, id: Date.now() }]);
      setNewItem({ title: "", author: "", category: "", quantity: "" }); // Reset form
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Delete library item
  const handleDeleteItem = (id) => {
    setLibraryItems(libraryItems.filter((item) => item.id !== id));
  };

  // Start editing an item
  const handleEditItem = (item) => {
    setEditingItemId(item.id);
    setNewItem(item); // Populate the form with the item's data
  };

  // Save updated item
  const handleUpdateItem = () => {
    if (newItem.title && newItem.author && newItem.category && newItem.quantity) {
      setLibraryItems(
        libraryItems.map((item) =>
          item.id === editingItemId ? { ...newItem, id: editingItemId } : item
        )
      );
      setNewItem({ title: "", author: "", category: "", quantity: "" }); // Reset form
      setEditingItemId(null); // Exit edit mode
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (


        <>
        <BackButton/>

    <div className="library-staff-page">
      <h1>Library Management</h1>

      {/* Form to add/update library items */}
      <div className="library-form">
        <h2>{editingItemId ? "Update Library Item" : "Add New Library Item"}</h2>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={newItem.title}
            onChange={handleInputChange}
            placeholder="Enter book title"
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={newItem.author}
            onChange={handleInputChange}
            placeholder="Enter author name"
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={newItem.category}
            onChange={handleInputChange}
            placeholder="Enter category"
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={newItem.quantity}
            onChange={handleInputChange}
            placeholder="Enter quantity"
          />
        </div>
        {editingItemId ? (
          <button className="save-button" onClick={handleUpdateItem}>
            <FaSave /> Update Item
          </button>
        ) : (
          <button className="add-button" onClick={handleAddItem}>
            <FaPlus /> Add Item
          </button>
        )}
      </div>

      {/* List of library items */}
      <div className="library-list">
        <h2>Library Items</h2>
        {libraryItems.length === 0 ? (
          <p>No library items added yet.</p>
        ) : (
          libraryItems.map((item) => (
            <div key={item.id} className="library-item">
              <div className="item-details">
                <h3>{item.title}</h3>
                <p>
                  <strong>Author:</strong> {item.author}
                </p>
                <p>
                  <strong>Category:</strong> {item.category}
                </p>
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
              </div>
              <div className="item-actions">
                <button
                  className="edit-button"
                  onClick={() => handleEditItem(item)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
}

export default LibraryStaff;