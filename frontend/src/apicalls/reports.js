const { default: axiosInstance } = require(".");

export const addReport = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/reports/add-report",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getReports = async (filter) => {
  try {
    const response = await axiosInstance.post(
      "/api/reports/get-reports",filter
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getReportsByID = async () => {
  try {
    const response = await axiosInstance.post(
      "/api/reports/get-reports-by-userId"
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
