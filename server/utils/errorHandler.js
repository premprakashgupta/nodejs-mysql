function errorHandler(err, req, res, next) {
    // Log the error
    console.error(err.stack);
  
    // Set default status code and error message
    let statusCode = 500;
    let errorMessage = 'Internal Server Error';
  
    // Check if the error is a known type
    if (err instanceof SyntaxError && 'body' in err) {
      statusCode = 400; // Bad Request
      errorMessage = 'Invalid JSON payload';
    } else if (err.message) {
      // If the error has a message, use it as the error message
      errorMessage = err.message;
    }
  
    // Send error response
    res.status(statusCode).json({ error: errorMessage });
  }
  
  module.exports = errorHandler;
  