export interface ApiResponseType<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiErrorResponseType {
  isSuccess: boolean;
  message: string;
  error: string;
  timestamp: string;
  path?: string;
  statusCode: number;
}

export interface BaseListResponseType<T> {
  page: number;
  size: number;
  totalPage: number;
  totalRecord: number;
  datas: T[];
}
