import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../shared/hooks/useFetch";
import { getUsers } from "./userApi";
import { getProfessions } from "../professions/professionApi";
import { deleteUser } from "./userApi";
import { useAuth } from "../../modules/auth/AuthProvider";
import _ from "underscore";

export const useUsersPage = () => {
  const { data: users, setData: setUsers } = useFetch(getUsers);
  const { user: curr_user } = useAuth();
  const { data: professions } = useFetch(getProfessions);
  const [searchParams, setSearchParams] = useSearchParams();

  // --------------------------------------------------
  // URL helpers
  // --------------------------------------------------

  const getBooleanParam = (value) => value === "true";

  const filters = {
    name: searchParams.get("name") || "",
    email: searchParams.get("email") || "",
    phone: searchParams.get("phone") || "",
    role: searchParams.get("role") || "",
    account_verified: searchParams.get("account_verified") || "",
    profession_name: searchParams.get("profession_name") || "",
    show_family: getBooleanParam(searchParams.get("show_family")),
  };

  const currentPage = Math.max(
    parseInt(searchParams.get("page") || "1", 10),
    1,
  );

  const rowsPerPage = Math.max(
    parseInt(searchParams.get("rows") || "10", 10),
    1,
  );

  const sortConfig = {
    key: searchParams.get("sort") || "first_name",
    direction: searchParams.get("direction") === "desc" ? "desc" : "asc",
  };

  const [success, setSuccess] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState({});

  // --------------------------------------------------
  // Update URL params
  // --------------------------------------------------

  const updateSearchParams = (updates) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);

        Object.entries(updates).forEach(([key, value]) => {
          if (
            value === "" ||
            value === null ||
            value === undefined ||
            value === false
          ) {
            params.delete(key);
          } else {
            params.set(key, String(value));
          }
        });

        return params;
      },
      { replace: true },
    );
  };

  // --------------------------------------------------
  // Filtering
  // --------------------------------------------------

  const filteredRows = useMemo(() => {
    return (
      users?.filter((row) => {
        const phone = row?.phone ?? "";
        const professionName = row?.profession_name ?? "";

        return (
          row?.first_name
            ?.toLowerCase()
            ?.includes(filters.name.toLowerCase()) &&
          (filters.profession_name !== ""
            ? professionName.toLowerCase() ===
              filters.profession_name.toLowerCase()
            : true) &&
          row?.email?.toLowerCase()?.includes(filters.email.toLowerCase()) &&
          phone.toLowerCase().includes(filters.phone.toLowerCase()) &&
          (filters.role !== ""
            ? row?.role?.toLowerCase() === filters.role.toLowerCase()
            : true) &&
          row?.account_verified
            ?.toString()
            ?.toLowerCase()
            ?.includes(filters.account_verified.toLowerCase())
        );
      }) || []
    );
  }, [users, filters]);

  // Clear selected users when filters change
  useEffect(() => {
    setSelectedUsers({});
  }, [
    filters.name,
    filters.email,
    filters.phone,
    filters.role,
    filters.account_verified,
    filters.profession_name,
    filters.show_family,
  ]);

  // --------------------------------------------------
  // Select all
  // --------------------------------------------------

  const allFilteredSelected =
    filteredRows.length > 0 &&
    filteredRows.every((user) => Boolean(selectedUsers[user.id]));

  const handleSelectAll = (e) => {
    const checked = e.target.checked;

    setSelectedUsers((prev) => {
      const updated = { ...prev };

      filteredRows.forEach((user) => {
        if (checked) {
          updated[user.id] = true;
        } else {
          delete updated[user.id];
        }
      });

      return updated;
    });
  };

  // --------------------------------------------------
  // Sorting helper
  // --------------------------------------------------

  const compareUsers = (a, b) => {
    let aValue = a?.[sortConfig.key] ?? "";
    let bValue = b?.[sortConfig.key] ?? "";

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
    }

    if (typeof bValue === "string") {
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }

    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }

    return 0;
  };

  // --------------------------------------------------
  // Family view
  // --------------------------------------------------

  const familyResult = useMemo(() => {
    if (!users?.length || !filteredRows?.length) {
      return [];
    }

    const usersById = new Map(users.map((user) => [user.id, user]));

    const principalIds = new Set(
      filteredRows.map((user) =>
        user.root_id == null ? user.id : user.root_id,
      ),
    );

    const groups = new Map();

    principalIds.forEach((principalId) => {
      const principal = usersById.get(principalId);

      if (!principal) {
        return;
      }

      const familyMembers = users.filter(
        (user) => user.root_id != null && user.root_id === principalId,
      );

      groups.set(principalId, [principal, ...familyMembers]);
    });

    const groupArray = [...groups.values()];

    groupArray.sort(([a], [b]) => compareUsers(a, b));

    return groupArray.flat();
  }, [users, filteredRows, sortConfig.key, sortConfig.direction]);

  // --------------------------------------------------
  // Without family view
  // --------------------------------------------------

  const withoutFamilyResult = useMemo(() => {
    return [...filteredRows].sort(compareUsers);
  }, [filteredRows, sortConfig.key, sortConfig.direction]);

  const result = filters.show_family ? familyResult : withoutFamilyResult;

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const totalEntities = result.length;

  const totalPages = Math.max(Math.ceil(totalEntities / rowsPerPage), 1);

  const startIndex =
    totalEntities === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;

  const endIndex = Math.min(currentPage * rowsPerPage, totalEntities);

  const getVisiblePages = () => {
    const maxVisible = 10;

    let start = Math.max(currentPage - Math.floor(maxVisible / 2), 1);

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

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      updateSearchParams({
        page,
      });
    }
  };

  const paginatedData = () => {
    const start = (currentPage - 1) * rowsPerPage;

    return result.slice(start, start + rowsPerPage);
  };

  // --------------------------------------------------
  // Filters
  // --------------------------------------------------

  const handleFilterChange = (field, value) => {
    updateSearchParams({
      [field]: value,
      page: 1,
    });
  };

  // --------------------------------------------------
  // Rows per page
  // --------------------------------------------------

  const setRowsPerPage = (value) => {
    updateSearchParams({
      rows: value,
      page: 1,
    });
  };

  // --------------------------------------------------
  // Sorting
  // --------------------------------------------------

  const toggleOrder = (column) => {
    const direction =
      sortConfig.key === column
        ? sortConfig.direction === "asc"
          ? "desc"
          : "asc"
        : "asc";

    updateSearchParams({
      sort: column,
      direction,
      page: 1,
    });
  };

  // --------------------------------------------------
  // Delete
  // --------------------------------------------------

  const handleDelete = (user) => {
    if (curr_user.id !== user.id) {
      if (!window.confirm("Are you sure you want to delete this user?")) {
        return;
      }

      deleteUser(user.id).then(() =>
        setUsers((prev) => prev.filter((u) => u.id !== user.id)),
      );
    } else {
      alert("You cannot delete your own account!");
    }
  };

  // --------------------------------------------------
  // User settings
  // --------------------------------------------------

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

  // --------------------------------------------------
  // User selection
  // --------------------------------------------------

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) => {
      const updated = { ...prev };

      if (updated[userId]) {
        delete updated[userId];
      } else {
        updated[userId] = true;
      }

      return updated;
    });
  };

  const handleEmailSelected = () => {
    const selectedEmails = (filteredRows || [])
      .filter((user) => selectedUsers[user.id])
      .map((user) => user.email)
      .filter(Boolean);

    if (selectedEmails.length === 0) {
      return;
    }

    const mailto = `mailto:${selectedEmails.join(",")}`;

    window.location.href = mailto;
  };

  return {
    // State
    users,
    filters,
    sortConfig,
    currentPage,
    rowsPerPage,
    selectedUsers,
    selectedUser,
    showSettingsModal,
    success,

    // Derived / computed data
    totalEntities,
    totalPages,
    startIndex,
    endIndex,
    professions,
    paginatedData,

    // Pagination
    goToPage,
    getVisiblePages,
    setRowsPerPage,

    // Filtering & sorting
    handleFilterChange,
    toggleOrder,

    // User actions
    updateUser,
    handleDelete,

    // Selection
    allFilteredSelected,
    handleSelectAll,
    handleSelectUser,
    handleEmailSelected,

    // Settings modal
    onSettingsModalClose,
    onSettingsModalUpdate,

    // Setters
    setUsers,
    setSelectedUser,
    setShowSettingsModal,
    setSuccess,
  };
};

export default useUsersPage;
