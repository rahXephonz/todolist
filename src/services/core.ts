/* eslint-disable @typescript-eslint/no-unused-vars */
import { encode } from "qss";
import _fetch from "unfetch";

enum MethodKey {
  "GET",
  "PUT",
  "POST",
  "DELETE",
  "PATCH",
}

interface FetchOptions {
  body?: FormData;
  json?: object;
  mode?: string;
  params?: object;
  headers?: object;
  isPrivate?: boolean;
  local?: boolean;
  manualUrl?: boolean;
  version?: number;
}

interface Error {
  status?: number;
}

export class CoreService {
  intercept500Error = async (err: Error) => {
    if (err?.status === 500) {
      const customErr = {
        ...err,
        message: `We seem to be experiencing a problem right now. Please wait a few minutes to try again.`,
      };
      await Promise.reject(customErr);
    }
  };

  fetch = async <T>(
    path = "/",
    method: keyof typeof MethodKey = "GET",
    {
      mode,
      body,
      json,
      params,
      headers,
      isPrivate = true,
      local = false,
      manualUrl = false,
      version = 1,
      ...opts
    }: FetchOptions = {},
  ): Promise<T> => {
    const search = params ? encode(params, "?") : "";

    const url = manualUrl ? path : `${process.env.API_KEY}${path}${search}`;

    try {
      const resp = await _fetch(url, {
        method,
        headers: {
          ...json,
          "Content-Type": "application/json",
          Accept: "application/json",
          ...headers,
        },
        ...opts,
        // wrap body
        body: body || (json ? JSON.stringify(json) : null),
        // credentials: 'include', // disabled
      });

      if (resp?.statusText === "No Content") {
        // bypass when it is csrf-cookie request
        return await Promise.resolve({} as T);
      }

      const jsonBody = await resp?.json();

      if (!resp?.ok) {
        return await Promise.reject(jsonBody);
      }

      let responseBody = {
        ...jsonBody,
      };

      if (Array.isArray(jsonBody)) {
        responseBody = [...jsonBody];
      }

      return await Promise.resolve(responseBody);
    } catch (err) {
      console.log("err", err);
      // deal with network error / CORS error
      if (err.name === "TypeError" && err.message === "Failed to fetch") {
        console.error("failed to get proper response from api server", err);
      }

      this.intercept500Error(err);

      // get response
      if (typeof err.json === "function") {
        const data = await err.json();
        err.response = { data };
      }

      if (typeof err?.response?.json === "function") {
        const data = await err.response.json();
        err.response = { data };
      }

      return await Promise.reject(err);
    }
  };
}

export const client = new CoreService();
