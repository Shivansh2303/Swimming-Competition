import axios from "axios";

const INSTAMOJO_API_URL = "https://api.instamojo.com/v2/payment_requests/";
const API_URL =process.env.BASE_URL;
export async function InstamojoPaymentIntent(token: string, userData: any) {
  try {
    const response = await axios.post(
      INSTAMOJO_API_URL,
      {
        allow_repeated_payments: false,
        send_email: true,
        email: userData.email,
        amount:10 ,
        purpose: "Swimming Competition",
        buyer_name: `${userData.swimmerFirstName} ${userData.swimmerSecondName}`,
        redirect_url: `${API_URL}/payment/status`,
        phone:userData.parent1Contact
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
