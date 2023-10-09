import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action) || action.error) {
    toast.error(`Error while fetching: ${action.error?.message ?? ""}`);
  }

  return next(action);
};
