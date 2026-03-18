import { useSuspenseQuery } from '@tanstack/react-query';
import getApiData from '@/services/api/get-api-data';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { ProductsResponse } from '@/types';

interface FetchProductsParams {
  limit?: number;
  skip?: number;
  query?: string;
}

export function useGetProducts({ limit = 10, skip = 0, query = '' }: FetchProductsParams) {
  return useSuspenseQuery({
    queryKey: ['products', query, skip, limit],
    queryFn: async (): Promise<ProductsResponse> => {
      let endpoint = `${API_ENDPOINTS.PRODUCTS}?limit=${limit}&skip=${skip}`;
      if (query) {
        endpoint = `${API_ENDPOINTS.PRODUCTS_SEARCH}?q=${query}&limit=${limit}&skip=${skip}`;
      }
      return await getApiData(endpoint);
    },
  });
}
