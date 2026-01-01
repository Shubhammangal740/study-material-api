const errorHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: "Server error",
  });
};

module.exports = errorHandler;
