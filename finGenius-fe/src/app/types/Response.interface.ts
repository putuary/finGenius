export interface IResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface IPageResponse<T> {
  code: number;
  message: string;
  page: number;
  limit: number;
  totalPage: number;
  totalDataPerPage: number;
  totalData: number;
  data: T;
}

export interface IResponseMessage {
  code: number;
  message: string;
  time: string;
}
