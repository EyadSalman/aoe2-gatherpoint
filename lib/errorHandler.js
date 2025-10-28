// lib/errorHandler.js
export function handleError(error) {
  console.error("🔥 Error:", error);

  let status = 500;
  let message = "Server Error";

  // Mongoose bad ObjectId
  if (error.name === "CastError") {
    status = 404;
    message = "Resource not found";
  }

  // Duplicate key
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    message = `${field} already exists`;
    status = 400;
  }

  // Validation error
  if (error.name === "ValidationError") {
    message = Object.values(error.errors).map((e) => e.message).join(", ");
    status = 400;
  }

  // JWT errors
  if (error.name === "JsonWebTokenError") {
    message = "Invalid token";
    status = 401;
  }

  if (error.name === "TokenExpiredError") {
    message = "Token expired";
    status = 401;
  }

  return {
    success: false,
    message,
    status,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  };
}
