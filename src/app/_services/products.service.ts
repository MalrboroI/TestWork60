import api from './api';
import { ProductsResponse } from '../_globalTypes/products.types';

export const fetchProducts = async (limit: number = 12): Promise<ProductsResponse> => {
  try {
    const response = await api.get(`/products?limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};