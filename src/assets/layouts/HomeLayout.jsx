import React from "react";
import Footer from "../../components/Footer";
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";

const HomeLayout = () => {
  return (
    <div>
      <section>
        <Navbar></Navbar>
      </section>
      <main>
        <Outlet />
      </main>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default HomeLayout;
