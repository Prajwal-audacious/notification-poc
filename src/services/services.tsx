import { ApiCaller } from "../utils";

export const loginApi = (data: any) => {
  return ApiCaller("api/users/login", "http://localhost:3000/", data, "POST");
};

export const addUser = (data: any) => {
  return ApiCaller(
    "api/users/user-add",
    "http://localhost:3000/",
    data,
    "POST"
  );
};
export const addNotification = (data: any) => {
  return ApiCaller(
    "api/notification/add-notification",
    "http://localhost:3000/",
    data,
    "POST"
  );
};
export const getNotification = () => {
  return ApiCaller("api/notification", "http://localhost:3000/", {}, "GET");
};

export const isReadNotification = (id: string) => {
  return ApiCaller(
    `api/notification/${id}`,
    "http://localhost:3000/",
    {},
    "PATCH"
  );
};

export const isReadAllNotification = () => {
  return ApiCaller(
    `api/notification/readAll`,
    "http://localhost:3000/",
    {},
    "GET"
  );
};
