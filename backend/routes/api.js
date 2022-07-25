const express = require('express');
const router = express.Router();
const meliServices = require("../services/index.js");
const authorMiddleware = require('../middlewares/authorMiddleware.js');

// Search items by text
router.get('/items' , authorMiddleware, async function(req, res) {

  const textQuery = req.query.q;
  const error = function(errorMessage){
    res.status(500).json({ error: errorMessage });
  }

  if(textQuery && textQuery.trim().length > 0){
    
    try {
      let result = await meliServices.getSearchProducts(textQuery);
      res.json({ author: res.author, ...result});
    } catch (error) {
      error(errorResponse);
    }

  }else{
    error(`No se encontraron resultados para la búsqueda de "${textQuery}".`);
  }

});

// Get item by ID
router.get('/items/:id' ,authorMiddleware, async function(req, res) {

  const productId = req.params.id;
  const error = function(errorMessage){
    res.status(404).json({ error: 404, message: errorMessage });
  }
  
  if(productId){

    try {
      let result = await meliServices.getProductByID(productId);
      res.json({ author: res.author, ...result});
    } catch (errorResponse) {
      error(errorResponse);
    }

  }else{
    error(`Item id: ${productId} no encontrado.`);
  }

});

module.exports = router;