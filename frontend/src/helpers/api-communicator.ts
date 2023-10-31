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
  const res = await axios.get("/auth/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/auth/new", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};



export const getUserChats = async () => {
  const token = localStorage.getItem('jwt');

  if (!token) {
    throw new Error('Token not found in local storage');
  }

  try {
    const res = await axios.get('/auth/past_conversations', {
      headers: {
        Authorization: `Bearer ${token}`, // Use backticks and interpolate the token
      },
    });

    if (res.status !== 200) {
      throw new Error('Unable to send chat');
    }

    const data = await res.data;
    return data;
  } catch (error) {
    throw error;
  }
};


export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};
