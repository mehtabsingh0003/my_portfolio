# Mehtab Singh — Full-Stack Developer Portfolio

<p align="center">
  <strong>A modern, full-stack developer portfolio with a dynamic admin dashboard.</strong>
</p>

<p align="center">
  <a href="https://github.com/mehtabsingh0003/my_portfolio">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository" />
  </a>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</p>

---

## 🚀 About The Project

This repository contains my personal **full-stack developer portfolio**, designed to present my technical skills, projects, professional profile, resume, and development activity through a modern web interface.

Instead of using a static portfolio, this project uses a backend-powered architecture where portfolio content can be managed dynamically through an admin interface.

The goal is to build a portfolio that is not only visually polished, but also demonstrates real-world software engineering concepts such as:

- REST API development
- Authentication and authorization
- Database-driven content management
- File and resume management
- CRUD operations
- External API integration
- Responsive UI development
- Reusable React components
- Frontend/backend separation

---

## ✨ Features

### 🌐 Public Portfolio

The public website provides dedicated sections for:

- Home
- About
- Projects
- Resume
- Skills
- Profile
- Contact

The content is dynamically loaded from the backend rather than being hard-coded into individual pages.

---

### 🛠️ Admin Dashboard

The portfolio includes an administrative interface for managing website content.

Administrators can manage:

- Profile information
- Projects
- Skills
- Resume
- Contact information
- Portfolio content

This allows the website to be updated without modifying the frontend source code every time.

---

### 📂 Project Management

Projects can be dynamically created and managed.

Each project can contain information such as:

- Project title
- Description
- Technologies
- Project image
- GitHub repository
- Live project URL
- Published status
- Featured status

Featured and published projects can then automatically appear on the public homepage.

---

### 📄 Resume Management

The application includes dynamic resume management.

Supported functionality includes:

- Uploading resumes
- Managing the current resume
- Viewing the resume in the browser
- Downloading the resume
- Displaying resume information on the portfolio

The frontend communicates with backend resume endpoints to retrieve and serve the active resume.

---

### 🧠 Skills Management

Skills can be managed dynamically through the admin interface.

Skills can be organized by categories such as:

- Programming Languages
- Frontend
- Backend
- Databases
- Tools
- Frameworks
- Other Technologies

This makes it easy to maintain and update the technical skill section.

---

### 📊 GitHub & LeetCode Integration

The portfolio can display development statistics from external developer platforms.

Examples include:

- GitHub profile information
- GitHub activity/statistics
- LeetCode statistics
- Coding activity

This gives visitors additional insight into development activity beyond the portfolio projects.

---

### 📬 Contact System

The portfolio includes a dedicated contact section that allows visitors or recruiters to reach out regarding:

- Job opportunities
- Freelance projects
- Collaboration
- Software development
- Technical discussions

---

## 🏗️ Architecture

The project follows a separated frontend/backend architecture.

```text
                     ┌─────────────────────┐
                     │     Portfolio UI     │
                     │       React         │
                     └──────────┬──────────┘
                                │
                                │ HTTP / REST API
                                ▼
                     ┌─────────────────────┐
                     │     Node / API      │
                     │      Backend        │
                     └──────────┬──────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
                ▼               ▼               ▼
          ┌──────────┐    ┌──────────┐    ┌─────────────┐
          │ MongoDB  │    │  Resume  │    │ External    │
          │ Database │    │ Storage  │    │ APIs        │
          └──────────┘    └──────────┘    └─────────────┘