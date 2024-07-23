import axios from "axios";

const INSTAMOJO_API_URL = "https://api.instamojo.com/oauth2/token/";
export async function getInstamojoToken() {
  try {
    const response = await axios.post(
      INSTAMOJO_API_URL,
      {
        client_id: "bZq47ppFIuGQp74pPF5tnoQCRtg8fb5vbzHK7KDy",
        client_secret:
          "FsGZbtxW7TpqbVrXWIvvVaQhujGLsGGG6eV8C0JLFYiqD7HVnz7ZRLZjye0QgcAcEbTWr8Tko7sx59vCBmelNDvuxSYUUqaYiCvS9U9yNaC8YMHf2hFGPMuVO2WmQggs",
        grant_type: "client_credentials",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching Instamojo token:", error);
    throw error;
  }
}
