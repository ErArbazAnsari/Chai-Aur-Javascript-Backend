// const asyncHandler = (fn) => {
//   async (req, res, next) => {
//     try {
//       await fn(req, res, next);
//     } catch (error) {
//       console.log("Error Code: ", error.code || 500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };
// };

// This function takes a request handler function (requestHandler) as an argument
// and returns a new function that wraps the request handler in a promise.
// If the promise is rejected (i.e., an error occurs), it will pass the error to the next middleware.

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
