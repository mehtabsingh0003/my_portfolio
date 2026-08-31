import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function ProtectedRoute() {
  const {
    isAuthenticated,
    loading,
  } = useAuth()

  const location = useLocation()


  // ==================================================
  // CHECKING AUTH SESSION
  // ==================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-500">
            Checking session...
          </p>
        </div>
      </div>
    )
  }


  // ==================================================
  // NOT AUTHENTICATED
  // ==================================================

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        state={{ from: location }}
        replace
      />
    )
  }


  // ==================================================
  // AUTHENTICATED
  // ==================================================

  return <Outlet />
}

export default ProtectedRoute