/**
 * @description AppApis is a collection of all the API endpoints used in the app.
 * @example
 * import AppApis from `@/utils/appApis`;
 * axiosInstance.get(AppApis.auth.login);
 */

const API_VERSION = "v1";

const AppApis = {
  todos: {
    create: `/api/${API_VERSION}/todos`,
    update: (id: string) => `/api/${API_VERSION}/todos/${id}`,
    delete: (id: string) => `/api/${API_VERSION}/todos/${id}`,
    getTodos: `/api/${API_VERSION}/todos`,
  },
};

export default AppApis;
