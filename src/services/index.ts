import api from "./axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const validate = async (payload: any) => {
  try {
    const response = await api.post("/validate-face", payload);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error during login:", error);
    if (error.response) {
      return error.response.data;
    }
    return {
      code: 400,
      message: "failed",
    };
  }
};
