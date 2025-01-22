import axios from "axios";

const baseURL = "http://127.0.0.1:8000";

// ===== Get CSRF Token from Cookie =====
const csrfToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("csrftoken"))
  ?.split("=")[1];

// ===== Login API =====
const Login_Api = async (username, password) => {
  try {
    const response = await axios.post(
      `${baseURL}/login/`,
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken, // CSRF token for security
        },
        withCredentials: true, // Include cookies in the request
      }
    );

    if (response.data) {
        console.log(response.data);
      return response.data; // Return the server response
    } 
  } catch (e) {
    alert(` ${e.response.data.message}`);

  }
};



// ===== Logout API =====
const Logout_Api = async () => {
  try {
    const response = await axios.post(
      `${baseURL}/logout`,
      {},
      {
        headers: {
          "X-CSRFToken": csrfToken, // CSRF token for security
        },
        withCredentials: true, // Include cookies in the request
      }
    );

    if (response.data) {
      return response.data; // Return the server response
    } else {
      throw new Error(response.data.message || "Logout failed");
    }
  } catch (e) {
    alert(`Error: ${e.response?.data?.message || e.message}`);
    return null;
  }
};

export { Login_Api, Logout_Api };
