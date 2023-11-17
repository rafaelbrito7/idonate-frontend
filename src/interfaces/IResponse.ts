/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IResponse {
  data: {
    statusCode: number
    message: string
    payload: string | string[] | any
  }
}
