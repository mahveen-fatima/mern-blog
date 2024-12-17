import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      // Make API call to logout
      await axios.post(
        "/api/v1/users/logout",
        null,
        {
          withCredentials: true, // Send cookies
        }
      );

      // Dispatch the logout action
      dispatch(logout());

      // Notify the user and navigate to login page
      alert("You have successfully logged out");
      navigate("/login");
    } catch (error) {
      // Handle API errors
      console.error("Logout failed: ", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Failed to logout. Please try again.");
    }
  };

  return (
    <button
      className="inline-block px-6 py-2 duration-200 hover:bg-indigo-400 rounded-full text-lg font-medium"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
