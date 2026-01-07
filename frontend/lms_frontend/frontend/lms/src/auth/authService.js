import axiosInstance from "../api/axios";

export const login = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const response = await axiosInstance.post(
    "/auth/login",
    { email, password }
  );

  // Backend response
  const { token, role } = response.data;

  if (!token || !role) {
    console.error("Invalid response:", response.data);
    throw new Error("Invalid login response from server");
  }

  // Store BOTH token and role
  localStorage.setItem("token", token);
  localStorage.setItem("userRole", role);

  console.log("Stored role in localStorage:", role);

  return { token, role };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
};
