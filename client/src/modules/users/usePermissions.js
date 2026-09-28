import { useAuth } from "../auth/AuthProvider";

export const PERMISSIONS = {
  VIEW_USERS: "view_users",
  DELETE_USERS: "delete_users",
  EDIT_USERS: "edit_users",
};

export const ROLE_PERMISSIONS = {
  admin: [
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.DELETE_USERS,
    PERMISSIONS.EDIT_USERS,
  ],

  subadmin: [PERMISSIONS.VIEW_USERS],
};

export default function usePermission() {
  const { user } = useAuth();

  const hasPermission = (permission) => {
    if (!user?.role) {
      return false;
    }

    return ROLE_PERMISSIONS[user.role]?.includes(permission);
  };

  const canDeleteUsers = hasPermission(PERMISSIONS.DELETE_USERS);
  const canUpdateUsers = hasPermission(PERMISSIONS.EDIT_USERS);
  return {
    canDeleteUsers,
    canUpdateUsers,
  };
}
