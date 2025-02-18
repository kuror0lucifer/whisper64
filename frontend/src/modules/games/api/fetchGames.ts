import apiService from '../../../api/apiService';
import { Game } from '../../../types/game.type';

export const fetchGames = async (
  itemsPerPage: string,
  page: string
): Promise<Game[]> => {
  try {
    const data = {
      requests: [
        {
          indexName: 'store_all_products_en_us',
          params: `query=&hitsPerPage=${itemsPerPage}&page=${page}&filters=price.salePrice>0`,
        },
      ],
    };

    const headers = {
      'Content-Type': 'application/json',
      'X-Algolia-API-Key': 'a29c6927638bfd8cee23993e51e721c9',
      'X-Algolia-Application-Id': 'U3B6GR4UA3',
    };

    const response = await apiService.post(
      'https://U3B6GR4UA3-dsn.algolia.net/1/indexes/*/queries',
      data,
      headers
    );

    return response.data?.results[0].hits;
  } catch {
    return [];
  }
};
