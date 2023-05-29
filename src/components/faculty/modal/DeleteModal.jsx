import React from 'react'

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
    if (!isOpen) {
        return null;
      }
    
      const handleDelete = () => {
        onDelete(); // Call the parent's onDelete function
      };


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-cyan-800 w-96 rounded p-6 border border-gray-300 shadow-lg">
                <h2 className=" text-lg font-bold mb-4">Confirm Deletion</h2>
                <p className=" mb-4">Are you sure you want to delete this item?</p>
                <div className="flex justify-end">
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        OK
                    </button>
                    <button
                        onClick={onClose} // Call the parent's onClose function
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal