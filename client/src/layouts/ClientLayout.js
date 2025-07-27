import React from "react";
import { Outlet, useLocation, useMatch } from "react-router-dom";
import ClientNavbar from "../components/ClientNavbar";
import MainLayout from "./MainLayout";

function ClientLayout() {

  // Check if we are on the MyCourseDetails page
  const isCourseDetailsPage = useMatch("/my-courses/:courseId");

  return (
    <MainLayout>
      <div style={{ width: "100%" }}>
        {!isCourseDetailsPage && <ClientNavbar />}
        <div style={{ marginTop: 60 }}>
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
}

export default ClientLayout;
