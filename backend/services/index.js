require('dotenv').config();
const axios = require("axios");
const API_URL = process.env.ENVIROMENT_MELI || 'https://api.mercadolibre.com';

// Find products by text
const getSearchProducts = async function(textQuery){
  try {
    const apiSearchItems = `${API_URL}/sites/MLA/search?limit=4&q=${textQuery}`;
    const response = await  axios.get(apiSearchItems);
    const results = await getProducts(response.data);
    return results;
  } catch (error) {
    return error;
  }
}

// Find product by ID
const getProductByID = async function(productId){
  try {
    const urlApiItem = `${API_URL}/items/${productId}`;
    const response = await axios.get(urlApiItem);
    const results  = await getProductDetail(response.data);
    return results;
  } catch (error) {
    return error.response.data.error;
  }
}

const getProducts = function(data){

  return new Promise(function(resolve, reject){

    let result = {};
    result.categories = [];
    result.items = [];
    Promise.all([getProductsCategories(data.filters)])
    .then(function(values){

      result.categories = values[0];
      const promises = data.results.splice(0,4).map( item => getProduct(item));

      Promise.all(promises).then(function(items){

        result.items = items.map( item => {
          delete item.address
          return item;
        });

        resolve(result);
      }).catch(function(error){
        reject(error);
      });

    }).catch(function(error){
      reject(error);
    });

  });
};

const getProduct = function(data, detailed = false){

  const promise = new Promise(function(resolve, reject){

    let listPromises = [];
    let result = {
      id: data.id,
      title: data.title,
      price: {
        currency: "$",
        amount: data.price,
        decimals: "2"
      },
      picture: "",
      condition: data.condition,
      address: "",
      free_shipping:  data.shipping.free_shipping
    };

    listPromises.push(getProductCurrency(data.currency_id).then(function(currency){
      result.price.currency = currency.symbol;
      result.price.decimals = currency.decimals;
    }));

    if(!detailed){
      // get address and thumbnail 
      result.address = data.address && data.address.state_name;
      result.picture = data.thumbnail && data.thumbnail.replace(/-I\./, "-X.");

    }else{

      result.address = (data.seller_address && data.seller_address.state) && data.seller_address.state.name;

      result.picture = (data.pictures && data.pictures.length>0) && data.pictures[0].url;

      result.sold_quantity = data.sold_quantity ? data.sold_quantity : '';

      if(data.descriptions.length == 0){
        listPromises.push(getProductDescription(data.id).then( (description) => { result.description = description; }) );
      }else{
        result.description = "";
      }

    }

    Promise.all(listPromises).then(function(...data){
      resolve(result);
    }).catch(function(error){
      reject(error);
    });

  });

  return promise;
}

const getProductsCategories = function(filters){
  return new Promise(function(resolve, reject){

    let categories = [];
    filters.forEach( filter => {
      categories =  (filter.id === 'category' && filter.values.length > 0) && filter.values[0].path_from_root.map( value => value.name );  
    }); 
    resolve(categories);

  });
}


const getProductDetail = function(data){
  return new Promise(function(resolve, reject){
    Promise.all([getProduct(data, true)]).then( values => resolve({"item": values[0]}) );
    }).catch(function(error){
      reject(error);
    });
};

const getProductDescription = async function(productId){
  try {
    const urlDescription = `${API_URL}/items/${productId}/description`;
    const { data } = await axios.get(urlDescription);
    return data.plain_text;
  } catch (error) {
    return error;
  }
}

const getProductCurrency = async function(currencyId){

  try {
    const urlCurrency = `${API_URL}/currencies/${currencyId}`;
    const {data} = await axios.get(urlCurrency);
    return {
      "id": data.id,
      "symbol": data.symbol,
      "decimals": data.decimal_places
    }
  } catch (error) {
    return error;
  }

};


const MeliServices = {
  getProductByID: getProductByID,
  getSearchProducts: getSearchProducts
};

module.exports = MeliServices;
