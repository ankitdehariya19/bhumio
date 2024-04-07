import React, { useEffect, useState } from "react";
import useRolesService from "../services/useRolesService";
import Modal from "./../components/element/Modal";
import Button from "../components/element/Button";
import TableComponent from "../components/element/TableComponent";
import RolesModal from "../components/Modal/RolesModal";

const Roles = () => {
  const {
    roles,
    loading,
    error,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,
  } = useRolesService();
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [specificError, setSpecificError] = useState(null);

  useEffect(() => {
    fetchRoles().catch((error) => setSpecificError(error.message));
  }, []);

  const handleCreateRole = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditRole = (roleId) => {
    setSelectedRoleId(roleId);
    setIsEditModalOpen(true);
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await deleteRole(roleId);
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const handleSaveNewRole = async (formData) => {
    try {
      await createRole(formData);
      setIsCreateModalOpen(false);
      fetchRoles().catch((error) => setSpecificError(error.message));
    } catch (error) {
      console.error("Error saving new role:", error);
    }
  };

  const handleSaveEditedRole = async (editedData) => {
    try {
      await updateRole(selectedRoleId, editedData);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error saving edited role:", error);
    }
  };

  const columns = ["Name", ];

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Roles</h1>
        <Button onClick={handleCreateRole}>Create New Role</Button>
      </div>
      {loading ? <p className="text-gray-600">Loading...</p> : null}
      {specificError && <p className="text-red-600">Error: {specificError}</p>}
      {error && !specificError && (
        <p className="text-red-600">Error: {error}</p>
      )}
      {roles && roles.length > 0 ? (
        <TableComponent
          data={roles}
          columns={columns}
          onEdit={handleEditRole}
          onDelete={handleDeleteRole}
        />
      ) : (
        <p>No roles found.</p>
      )}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <RolesModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleSaveNewRole}
        />
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <RolesModal
          isEditing={true}
          role={roles.find((role) => role.id === selectedRoleId)}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEditedRole}
        />
      </Modal>
    </div>
  );
};

export default Roles;
