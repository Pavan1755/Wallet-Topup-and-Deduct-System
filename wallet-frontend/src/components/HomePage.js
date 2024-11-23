import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBalance, setLoading, setError, selectBalance } from '../features/walletSlice';
import axios from 'axios';

const HomePage = () => {
  const [amount, setAmount] = useState('');
  const [userId, setUserId] = useState('');
  const [viewUserId, setViewUserId] = useState(''); // Separate field for view balance user ID
  const [transactionType, setTransactionType] = useState('topup');
  const balance = useSelector(selectBalance);
  const loading = useSelector((state) => state.wallet.loading); // Assuming you have a loading state
  const error = useSelector((state) => state.wallet.error); // Assuming you have an error state
  const dispatch = useDispatch();

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleViewUserIdChange = (e) => {
    setViewUserId(e.target.value); // Change the view balance user ID
  };

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !userId) {
      alert("Please provide user ID and amount");
      return;
    }
    setAmount("")
    try {
      dispatch(setLoading(true));
      dispatch(setError('')); // Reset error before new action

      const apiUrl = transactionType === 'topup' ? 'http://localhost:3000/wallet/topup' : 'http://localhost:3000/wallet/deduct';
      const response = await axios.post(apiUrl, { user_id: userId, amount });
      
      if (response.data.status) {
        dispatch(setBalance(response.data.new_balance));
      } else {
        dispatch(setError('Insufficient balance'));
      }
    } catch (error) {
      dispatch(setError('Insufficient balance'));
    } finally {
      dispatch(setLoading(false));
      
    }
  };

  const handleViewBalance = async () => {
    if (!viewUserId) {
      alert("Please provide a user ID to view balance");
      return;
    }

    try {
      dispatch(setLoading(true));
      const response = await axios.get(`http://localhost:3000/wallet/balance?user_id=${viewUserId}`);
      if (response.data.balance !== undefined) {
        dispatch(setBalance(response.data.balance));
      } else {
        dispatch(setError('User not found'));
      }
    } catch (error) {
      dispatch(setError('User not found'));
    } finally {
      dispatch(setLoading(false));
      
      // setViewUserId("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Wallet System</h1>

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center mb-6">
            <div className="animate-spin border-t-4 border-blue-500 w-8 h-8 rounded-full"></div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* View Balance Section */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">View Balance</h2>
          <input
            type="text"
            value={viewUserId}
            onChange={handleViewUserIdChange}
            placeholder="Enter User ID to View Balance"
            className="border-2 border-gray-300 p-3 w-3/4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button
            onClick={handleViewBalance}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            View Balance
          </button>
          {balance !== undefined && (
            <p className="mt-4 text-xl font-semibold text-green-600">Current Balance: ₹{balance}</p>
          )}
        </div>

        {/* Transaction Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={userId}
              onChange={handleUserIdChange}
              placeholder="Enter User ID"
              className="border-2 border-gray-300 p-3 w-1/2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Amount"
              className="border-2 border-gray-300 p-3 w-1/2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="flex justify-center space-x-6 mb-6">
            <label className="flex items-center">
              <input
                type="radio"
                value="topup"
                checked={transactionType === 'topup'}
                onChange={handleTransactionTypeChange}
                className="mr-2"
              />
              Topup
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="deduct"
                checked={transactionType === 'deduct'}
                onChange={handleTransactionTypeChange}
                className="mr-2"
              />
              Deduct
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all duration-300"
          >
            {transactionType === 'topup' ? 'Topup' : 'Deduct'} Wallet
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
