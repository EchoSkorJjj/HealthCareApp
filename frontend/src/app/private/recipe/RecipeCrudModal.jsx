import React from 'react';
import Modal from 'react-modal';
import '../../../assets/styles/private_styles/RecipeCard.css'; // Import your CSS file

Modal.setAppElement('#root'); // Set the root element for accessibility

export default function RecipeCrudModal({ isOpen, onRequestClose }) {
  // Define CRUD operation functions here
  const handleCreate = () => {
    // Implement your create logic
  };

  const handleRead = () => {
    // Implement your read logic
  };

  const handleUpdate = () => {
    // Implement your update logic
  };

  const handleDelete = () => {
    // Implement your delete logic
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="crud-modal" // Add your modal styling class here
    >
      <h3>CRUD Operations</h3>
      <div className="crud-operations">
        <button onClick={handleCreate}>Create</button>
        <button onClick={handleRead}>Read</button>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
}