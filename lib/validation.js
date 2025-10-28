// lib/validation.js
export function validateBody(schema, data) {
  const { error } = schema.validate(data);
  if (error) {
    const errors = error.details.map((d) => ({
      field: d.path.join("."),
      message: d.message,
    }));
    return {
      success: false,
      message: "Validation error",
      errors,
      status: 400,
    };
  }
  return { success: true };
}
