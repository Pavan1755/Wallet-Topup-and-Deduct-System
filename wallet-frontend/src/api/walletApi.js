import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';  // Adjust according to your API URL

export const getBalance = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wallet/balance?user_id=${userId}`);
    return response.data.balance;
  } catch (error) {
    throw new Error('Error fetching balance');
  }
};

export const topupWallet = async (userId, amount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/wallet/topup`, { user_id: userId, amount });
    return response.data;
  } catch (error) {
    throw new Error('Error topping up wallet');
  }
};

export const deductWallet = async (userId, amount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/wallet/deduct`, { user_id: userId, amount });
    return response.data;
  } catch (error) {
    throw new Error('Error deducting from wallet');
  }
};
