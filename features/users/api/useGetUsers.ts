import { useSuspenseQuery } from '@tanstack/react-query';
import getApiData from '@/services/api/get-api-data';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { UsersResponse } from '@/types';

interface FetchUsersParams {
  limit?: number;
  skip?: number;
  query?: string;
}

export function useGetUsers({ limit = 10, skip = 0, query = '' }: FetchUsersParams) {
  return useSuspenseQuery({
    queryKey: ['users', query, skip, limit],
    queryFn: async (): Promise<UsersResponse> => {
      let endpoint = `${API_ENDPOINTS.USERS}?limit=${limit}&skip=${skip}`;
      if (query) {
        endpoint = `${API_ENDPOINTS.USERS_SEARCH}?q=${query}&limit=${limit}&skip=${skip}`;
      }
      return await getApiData(endpoint);
    },
  });
}
