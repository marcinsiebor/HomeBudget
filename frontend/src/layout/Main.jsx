// Importing necessary components and assets
import { Outlet, useLoaderData } from "react-router-dom"; // React Router DOM imports

// Components
import Nav from "../components/Nav"; // Navigation component

// Assets
import wave from "../assets/wave.svg"; // Wave image asset

// Main layout component
const Main = () => { 
  return (
    <div className="layout">
      <Nav /> {/* Navigation bar */}
      <main>
        <Outlet /> {/* Render child routes */}
      </main>
      <img src={wave} alt="" /> {/* Wave image */}
    </div>
  )
}
export default Main;