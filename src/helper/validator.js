export const Validator = (schema) => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      console.log(data)
      await schema.validateSync(data, { abortEarly: false });
      console.log("hero")
      next();
    } catch (err) {
      if (err.inner) {
        const errors = err.inner.map((e) => ({
          path: e.path,
          message: e.message,
        }));
        return res.status(400).json({ errors });
      } else {
        console.error('Unexpected error:', err);
      }
    }
  };
};
