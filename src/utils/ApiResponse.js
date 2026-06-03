class ApiResponse {
  static success(res, data = null, message = "Operation successful", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(res, message = "Internal server error", statusCode = 500, errors = null) {
    const body = {
      success: false,
      message,
    };
    if (errors) body.errors = errors;
    return res.status(statusCode).json(body);
  }

  static created(res, data = null, message = "Resource created successfully") {
    return ApiResponse.success(res, data, message, 201);
  }

  static noContent(res) {
    return res.status(204).end();
  }
}

module.exports = ApiResponse;
