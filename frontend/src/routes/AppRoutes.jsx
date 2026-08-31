import { Routes, Route, Navigate } from "react-router-dom"

// =====================================================
// PUBLIC PAGES
// =====================================================

import Home from "../pages/public/Home"
import About from "../pages/public/About"
import Projects from "../pages/public/Projects"
import Resume from "../pages/public/Resume"
import Contact from "../pages/public/Contact"
import PublicProfile from "../pages/public/Profile"

// Coding pages
import Github from "../pages/public/coding/Github"
import Leetcode from "../pages/public/coding/Leetcode"


// =====================================================
// ADMIN PAGES
// =====================================================

import Login from "../pages/admin/Login"
import Dashboard from "../pages/admin/Dashboard"
import AdminProjects from "../pages/admin/Projects"
import ProjectForm from "../pages/admin/ProjectForm"
import AdminResume from "../pages/admin/Resume"
import Skills from "../pages/admin/Skills"
import SkillForm from "../pages/admin/SkillForm"
import Messages from "../pages/admin/Messages"
import AdminProfile from "../pages/admin/Profile"


// =====================================================
// LAYOUTS
// =====================================================

import PublicLayout from "../layouts/PublicLayout"
import AdminLayout from "../layouts/AdminLayout"
import ProtectedRoute from "../components/ProtectedRoute"


// =====================================================
// OTHER PAGES
// =====================================================

import NotFound from "../pages/NotFound"


function AppRoutes() {
  return (
    <Routes>

      {/* =================================================
          PUBLIC ROUTES
          ================================================= */}

      <Route element={<PublicLayout />}>

        {/* Home */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* About */}

        <Route
          path="/about"
          element={<About />}
        />


        {/* Projects */}

        <Route
          path="/projects"
          element={<Projects />}
        />


        {/* Resume */}

        <Route
          path="/resume"
          element={<Resume />}
        />


        {/* Profile */}

        <Route
          path="/profile"
          element={<PublicProfile />}
        />


        {/* GitHub */}

        <Route
          path="/github"
          element={<Github />}
        />


        {/* LeetCode */}

        <Route
          path="/leetcode"
          element={<Leetcode />}
        />


        {/* Contact */}

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Route>


      {/* =================================================
          ADMIN LOGIN
          ================================================= */}

      <Route
        path="/admin/login"
        element={<Login />}
      />


      {/* =================================================
          PROTECTED ADMIN ROUTES
          ================================================= */}

      <Route element={<ProtectedRoute />}>

        <Route element={<AdminLayout />}>

          {/* =============================================
              DASHBOARD
              ============================================= */}

          <Route
            path="/admin/dashboard"
            element={<Dashboard />}
          />


          {/* =============================================
              PROJECTS
              ============================================= */}

          <Route
            path="/admin/projects"
            element={<AdminProjects />}
          />

          <Route
            path="/admin/projects/create"
            element={<ProjectForm />}
          />

          <Route
            path="/admin/projects/:id/edit"
            element={<ProjectForm />}
          />


          {/* =============================================
              RESUME
              ============================================= */}

          <Route
            path="/admin/resume"
            element={<AdminResume />}
          />


          {/* =============================================
              SKILLS
              ============================================= */}

          <Route
            path="/admin/skills"
            element={<Skills />}
          />

          <Route
            path="/admin/skills/new"
            element={<SkillForm />}
          />

          <Route
            path="/admin/skills/edit/:id"
            element={<SkillForm />}
          />


          {/* =============================================
              MESSAGES
              ============================================= */}

          <Route
            path="/admin/messages"
            element={<Messages />}
          />


          {/* =============================================
              PROFILE
              ============================================= */}

          <Route
            path="/admin/profile"
            element={<AdminProfile />}
          />

        </Route>

      </Route>


      {/* =================================================
          ADMIN ROOT
          ================================================= */}

      <Route
        path="/admin"
        element={
          <Navigate
            to="/admin/dashboard"
            replace
          />
        }
      />


      {/* =================================================
          404
          ================================================= */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  )
}


export default AppRoutes