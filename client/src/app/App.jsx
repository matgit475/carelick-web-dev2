import * as React from "react";
import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "../modules/auth/components/ProtectedRoute";
import PublicLayout from "../layouts/Public/PublicLayout";
import AuthLayout from "../modules/auth/layouts/AuthLayout";
import AdminPortalLayout from "../layouts/Portal/AdminPortalLayout";
import SubAdminPortalLayout from "../layouts/Portal/SubAdminPortalLayout";
import MemberPortalLayout from "../layouts/Portal/MemberPortalLayout";

import AdminDashboard from "../modules/dashboard/AdminDashboard";
import SubAdminDashboard from "../modules/dashboard/SubAdminDashboard";
import MemberDashboard from "../modules/dashboard/MemberDashboard";

import HomePage from "../pages/Home/HomePage";
import NewsPage from "../modules/news/NewsPage";

import { EventsPage, EventDetailPage } from "../modules/events/pages";
import UsersPage from "../modules/users/UsersPage";

import {
  RegisterPage,
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  VerifyOtpPage,
} from "../modules/auth/pages";

import AccountPage from "../modules/account/AccountPage";
import UserPage from "../modules/users/UserPage";
import VerificationList from "../modules/verifications/VerificationList";

import BackToTop from "../shared/components/BackToTop";
import useScrollToTop from "../shared/hooks/useScrollToTop";

import { useAuth } from "../modules/auth/AuthProvider";

function App() {
  const { loadAccount } = useAuth();

  useScrollToTop();

  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="events/:id" element={<EventDetailPage />} />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="verify-otp" element={<VerifyOtpPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
          </Route>
          <Route path="/portal" element={<ProtectedRoute role="admin" />}>
            <Route path="admin" element={<AdminPortalLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="user-settings/:id" element={<UserPage />} />
              <Route path="account-settings" element={<AccountPage />} />
              <Route path="verifications" element={<VerificationList />} />
            </Route>
          </Route>
          <Route path="/portal" element={<ProtectedRoute role="subadmin" />}>
            <Route path="subadmin" element={<SubAdminPortalLayout />}>
              <Route path="dashboard" element={<SubAdminDashboard />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="user-settings/:id" element={<UserPage />} />
              <Route path="account-settings" element={<AccountPage />} />
            </Route>
          </Route>
          <Route path="/portal" element={<ProtectedRoute role="members" />}>
            <Route path="members" element={<MemberPortalLayout />}>
              <Route path="dashboard" element={<MemberDashboard />} />
              <Route path="account-settings" element={<AccountPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <BackToTop />
    </>
  );
}

export default App;
