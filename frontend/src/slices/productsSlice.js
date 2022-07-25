import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, getProductById } from '../services';
import { setLoading } from '../slices/uiSlice';

const initialState = {
  products: [],
  product:{}
};

export const fetchProducts = createAsyncThunk(
  'data/fetchProducts',
  async (query, { dispatch }) => {
    dispatch(setLoading(true));
    const response = await getProducts(query);
    dispatch(setProducts(response));
    dispatch(setLoading(false));
  }
);

export const fetchProduct = createAsyncThunk(
  'data/fetchProduct',
  async (productId, { dispatch }) => {
    dispatch(setLoading(true));
    const response = await getProductById(productId);
    dispatch(setProduct(response));
    dispatch(setLoading(false));
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    }
  },
});

export const { setProducts, setProduct } = productsSlice.actions;

export default productsSlice.reducer;