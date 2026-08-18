import React, { useState } from "react";
import useFetch from "../../shared/hooks/useFetch";
import { getUsers } from "./userApi";
import { getProfessions } from "../professions/professionApi";
import { deleteUser } from "./userApi";
import { useAuth } from "../../modules/auth/AuthProvider";

export const useUsersPage = () => {
  const { data: users, setData: setUsers } = useFetch(getUsers);
  const { user: curr_user } = useAuth();
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    account_verified: "",
    profession_name: "",
  });
  const { data: professions } = useFetch(getProfessions);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    key: "first_name",
    direction: "asc",
  });
  const [success, setSuccess] = React.useState(null);
  const [showSettingsModal, setShowSettingsModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const filteredRows = users?.filter((row) => {
    if (row?.phone == null) {
      row.phone = "";
    }
    if (row?.profession_name == null) {
      row.profession_name = "";
    }

    return (
      row?.first_name?.toLowerCase()?.includes(filters?.name?.toLowerCase()) &&
      (filters?.profession_name !== ""
        ? row?.profession_name.toLowerCase() ===
          filters?.profession_name.toLowerCase()
        : true) &&
      row?.email?.toLowerCase()?.includes(filters?.email?.toLowerCase()) &&
      row?.phone?.toLowerCase()?.includes(filters?.phone?.toLowerCase()) &&
      (filters?.role !== ""
        ? row?.role.toLowerCase() === filters?.role.toLowerCase()
        : true) &&
      row?.account_verified
        ?.toString()
        ?.toLowerCase()
        ?.includes(filters?.account_verified?.toString()?.toLowerCase())
    );
  });
  const result = filteredRows?.sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // handle nulls
    aValue = aValue ?? "";
    bValue = bValue ?? "";

    // convert to string for safe compare
    if (typeof aValue === "string") aValue = aValue.toLowerCase();
    if (typeof bValue === "string") bValue = bValue.toLowerCase();

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;

    return 0;
  });
  // Pagination calculations
  const totalPages = Math.ceil(result?.length / rowsPerPage);
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const totalEntities = result?.length;
  const startIndex = (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(currentPage * rowsPerPage, totalEntities);

  const getVisiblePages = () => {
    const maxVisible = 10;

    let start = Math.max(currentPage - maxVisible / 2, 1);
    let end = start + maxVisible - 3;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisible + 1, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const paginatedData = () => {
    const start = (currentPage - 1) * rowsPerPage;
    return result?.slice(start, start + rowsPerPage);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };
  const toggleOrder = (column) => {
    setSortConfig((prev) => {
      if (prev.key === column) {
        // toggle direction
        return {
          key: column,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      } else {
        // new column → default asc
        return {
          key: column,
          direction: "asc",
        };
      }
    });
    setCurrentPage(1); // Reset to first page on toggle order change
  };

  const handleDelete = (user) => {
    if (curr_user.id !== user.id) {
      if (!window.confirm("Are you sure you want to delete this user?")) return;
      deleteUser(user.id).then(() =>
        setUsers((prev) => prev.filter((u) => u.id !== user.id)),
      );
    } else alert("You cannot delete your own account!");
  };

  const updateUser = (user) => {};

  const onSettingsModalClose = () => {
    setShowSettingsModal(false);
  };

  const onSettingsModalUpdate = (data) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === data.user.id ? data.user : u)),
    );
    setSuccess(data.message);
    setShowSettingsModal(false);
  };

  return {
    success,
    endIndex,
    startIndex,
    totalEntities,
    goToPage,
    getVisiblePages,
    rowsPerPage,
    users,
    setUsers,
    filters,
    setRowsPerPage,
    sortConfig,
    currentPage,
    setCurrentPage,
    totalPages,
    professions,
    paginatedData,
    handleFilterChange,
    handleDelete,
    onSettingsModalClose,
    onSettingsModalUpdate,
    toggleOrder,
    updateUser,
    showSettingsModal,
    selectedUser,
    setSelectedUser,
    setShowSettingsModal,
    setSuccess,
  };
};

export default useUsersPage;
