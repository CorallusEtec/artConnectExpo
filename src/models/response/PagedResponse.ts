/**
 * Interface para tipar as respostas que vem paginadas
 * @type `T` - Tipo do conteúdo da paginação
 */
export interface PagedResponse<T> {
  content: T[];

  // Dados paginação
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
}
