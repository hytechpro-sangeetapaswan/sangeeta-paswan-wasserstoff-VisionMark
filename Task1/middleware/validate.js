// Middleware for validate request data
exports.validate = (schema) => (req, res, next) => {
    try {
      // Combine request data from body, params, and query
      const requestData = {
        ...req.body,
        ...req.params,
        ...req.query,
      };
  
      const { error, values } = schema.validate(requestData);
      const valid = error == null;
  
      if (valid) {
        next();
      } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");
        res.json({ status: 422, success: false, error: message });
      }
    } catch (error) {
      res.json({ status: 422, success: false, error: error.message });
    }
  };
  