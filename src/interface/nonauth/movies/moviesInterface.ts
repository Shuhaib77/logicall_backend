export interface moviesPayload {
  title: string;
  type_id: number;
  budget: number;
  director: string;
  location: string;
  duration: string;
  user_id: number;
  year: number;
  time: Date;
}

export interface editMoviesPayload {
  title: string;
  type_id: number;
  budget: number;
  director: string;
  location: string;
  show_id: number;
  duration: string;
  user_id: number;
  year: number;
  time: Date;
}
export interface getShowsSearchPayload {
  user_id: number;
  search_in: string;
  page: number;
  limit: number;
}
export interface getShowsPayload {
  user_id: number;
  page: number;
  limit: number;
}

export interface getShowsTypePayload {
  user_id: number;
  page: number;
  limit: number;
  type_id: number;
}
export interface getShowsById {
  user_id: number;
  show_id: number;
}
