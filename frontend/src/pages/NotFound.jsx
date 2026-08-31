import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-6 text-center text-white">
      <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
        404
      </p>
      <h1 className="mt-3 text-3xl font-bold">Page not found</h1>
      <p className="mt-3 max-w-md text-gray-400">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-gray-200"
      >
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound
