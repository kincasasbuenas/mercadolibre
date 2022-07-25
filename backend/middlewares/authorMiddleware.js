const authorMiddleware = (req, res, next) => {
    res.author = {
      name: 'Kevin',
      lastname: 'Casasbuenas'
    };

    next();
  };
  
  module.exports = authorMiddleware;