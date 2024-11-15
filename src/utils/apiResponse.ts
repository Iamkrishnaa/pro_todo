import { Response } from "express";

/**
 * @class ApiResponse
 * @description Api response class
 * @param {number} status - HTTP status code
 * @param {string} message - Response message
 * @param {object} data - Response data
 * @param {array} errors - Array of errors
 * @returns {ApiResponse} - An instance of ApiResponse
 *
 */
interface ApiResponseOptions {
  status?: number;
  message?: string;
  data?: any;
  errors?: any;
}

class ApiResponse {
  public status: number;
  public message?: string;
  public data: any;
  public errors: any;

  constructor(options: ApiResponseOptions) {
    this.status = options.status || 200;
    this.message = options.message || undefined;
    this.data = options.data || undefined;
    this.errors = options.errors || undefined;
  }

  public send(res: Response) {
    return res.status(this.status).json(this);
  }
}

export default ApiResponse;
