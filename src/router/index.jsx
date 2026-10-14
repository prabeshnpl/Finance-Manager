import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "@/features/users/pages/LoginPage";
import { RegisterPage } from "@/features/users/pages/RegisterPage";
import { App } from "@/App";
import { ErrorMessage } from "@/shared/components/Error/ErrorMessage";
import { authLoader } from "./authLoader";
import { OrganizationPage } from "@/features/organization/pages/OrganizationPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { TransactionsList } from "@/features/transaction/pages/TransactionsList";
import { ReportsPage } from "@/features/report/pages/ReportPage";
import { AccountPage } from "@/features/account/pages/AccountPage";
import { FinanceSettings } from "@/features/finance/components/Settings/FinanceSettings";
import { TasksPage } from "@/features/tasks/pages/TaskPage";
import { ProfilePage } from "@/features/profile/pages/ProfilePage";
import { RoadmapPage } from "@/features/roadmap/pages/RoadmapPage";
import { DockerRoadmap }  from "@/lib/docker-roadmap";

export const router = createBrowserRouter([
  {
    path: "/",
    loader: authLoader,
    element: <App />,
    errorElement: <ErrorMessage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "tasks", element: <TasksPage /> },
      { path: "roadmaps", element: <RoadmapPage /> },
      // { path: "finance", element: <FinancePage /> },
      { path: "transactions", element: <TransactionsList /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "accounts", element: <AccountPage /> },
      { path: "settings", element: <FinanceSettings /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "organization", element: <OrganizationPage /> },
      { path: "notifications", element: <div className="p-6">Notifications</div> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorMessage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorMessage />,
  },
  {
    path: "docker",
    element: <DockerRoadmap />,
    errorElement: <ErrorMessage />,
  }

]);