import axios from "axios";
export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/auth/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("Token not found in local storage");
  }

  const res = await axios.get("/auth/auth-status", {
    headers: {
      Authorization: `Bearer ${token}`, // Use backticks and interpolate the token
    },
  });

  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("Token not found in local storage");
  }

  try {
    const res = await axios.post("/prompt/new_msg", { user_msg : message }, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header correctly
      }
    });

    console.log({response:res})

    if (res.status !== 200) {
      throw new Error("Unable to Get chat");
    }

    console.log({response:res})

    const data = await res.data.data;
    return data;
  } catch (error) {
    console.error("Error sending chat request: ", error);
    throw error; // Re-throw the error to handle it in the component
  }
};

export const getUserChats = async () => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("Token not found in local storage");
  }

  const res = await axios.get("/prompt/all-chats", {
    headers: {
      Authorization: `Bearer ${token}`, // Use backticks and interpolate the token
    },
  });
  console.log({response:res});

  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }

  const data = await res.data;
  return data;
};

// TODO: Implement this function
export const deleteUserChats = async () => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("Token not found in local storage");
  }

  try {
    const res = await axios.delete("/prompt/delete", {
      headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header correctly
      }
    });

    if (res.status !== 200) {
      throw new Error("Unable to Delete chat");
    }

    console.log({response:res})

  } catch (error) {
    console.error("Error deleting chat request: ", error);
    throw error; // Re-throw the error to handle it in the component
  }
};

export const logoutUser = async () => {
  const res = await axios.get("/auth/logout");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }

  localStorage.removeItem("jwt");
};
