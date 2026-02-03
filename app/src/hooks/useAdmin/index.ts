import { useGlobal } from '../useGlobal';
import { useMessage } from '../useMessage';

export const useAdmin = () => {
  const { pathname } = window.location;

  const global = useGlobal();
  const message = useMessage();
  const isAdmin = pathname.startsWith('/admin');

  const logout = (params?: { message?: string | null }) => {
    const { message: warningMessage = "You've been signed out. Please log in again." } =
      params || {};

    if (isAdmin) {
      global.actions.set({
        adminToken: '',
        user: null,
      });
    } else {
      global.actions.set({
        token: '',
        user: null,
      });
    }

    if (warningMessage) {
      message.warning(warningMessage);
    }
  };

  const loginUrl = isAdmin ? '/admin/login' : '/login';
  const dashboardUrl = isAdmin ? '/admin/dashboard' : '/dashboard';
  const token = isAdmin ? global.adminToken : global.token;

  return {
    isAdmin,
    token,
    logout,
    loginUrl,
    dashboardUrl,
  };
};
