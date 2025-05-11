// Auth.js
import { toast } from 'react-toastify';
import localforage from 'localforage';

export const registerUser = async (userData) => {
  try {
    await localforage.setItem(userData.email, userData);
    toast.success('Registro exitoso');
  } catch (error) {
    toast.error('Error en registro');
  }
};

export const loginUser = async (email, password) => {
  const user = await localforage.getItem(email);
  return user?.password === password ? user : null;
};
