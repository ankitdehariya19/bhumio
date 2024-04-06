import React, { useState, useEffect } from 'react';
import useUserService from '../services/useUserService';
import Modal from './../components/element/Modal';
import EditUser from '../components/element/EditUser';
import NewUser from '../components/element/NewUser';
import Button from '../components/element/Button';
import TableComponent from '../components/element/TableComponent';

const Users = () => {
  const {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  } = useUserService();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreateUser = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditUser = (userId) => {
    setSelectedUserId(userId);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSaveNewUser = async (formData) => {
    try {
      await createUser(formData);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error saving new user:', error);
    }
  };

  const handleSaveEditedUser = async (editedData) => {
    try {
      await updateUser(selectedUserId, editedData);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error saving edited user:', error);
    }
  };

  const columns = ['Username', 'Active', 'Roles']; 

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users</h1>
        <Button onClick={handleCreateUser}>Create New User</Button>
      </div>
      {loading ? <p className="text-gray-600">Loading...</p> : null}
      {error && <p className="text-red-600">Error: {error}</p>}
      <TableComponent
        data={users}
        columns={columns}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <NewUser onClose={() => setIsCreateModalOpen(false)} onSave={handleSaveNewUser} />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditUser
          user={users.find((user) => user.id === selectedUserId)}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEditedUser}
        />
      </Modal>
    </div>
  );
};

export default Users;
