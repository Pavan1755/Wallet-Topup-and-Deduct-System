import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deductWallet } from '../api/walletApi';
import { setBalance, setError } from '../features/walletSlice';

const DeductForm = () => {
  const [amount, setAmount] = useState('');
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount <= 0 || !userId) {
      dispatch(setError('Please provide a valid amount and user ID.'));
      return;
    }
    try {
      const response = await deductWallet(userId, amount);
      dispatch(setBalance(response.new_balance));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
        className="border p-2 w-full mb-2"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-red-500 text-white p-2 w-full">
        Deduct
      </button>
    </form>
  );
};

export default DeductForm;
