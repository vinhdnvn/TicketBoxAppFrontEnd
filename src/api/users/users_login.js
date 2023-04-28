import Client from "../Client";

export const users_login = async (email, password) => {
  try {
    const result = await Client.post("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
