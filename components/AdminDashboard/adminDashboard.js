import React, { useState } from 'react';
import NavigationBar from '../Navigation/NavigationBar';

function AdminDashboard() {
    const [userEmail, setUserEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const isValidEmail = email => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const isValidPassword = password => {
        return password.length >= 8 &&
               /[A-Z]/.test(password) &&
               /[a-z]/.test(password) &&
               /[0-9]/.test(password) &&
               /[\W_]/.test(password);
    };

    const handlePasswordReset = async () => {
        setMessage('');
        setIsError(false);

        if (!isValidEmail(userEmail)) {
            setIsError(true);
            setMessage('Invalid email format');
            return;
        }

        if (!isValidPassword(newPassword)) {
            setIsError(true);
            setMessage('Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and a special character.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch('/admin/user/profile/changeUserPasswordAdmin', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userEmail, newPassword })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to reset password');
            }

            setMessage('Password reset successfully');
        } catch (error) {
            setIsError(true);
            setMessage(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-e0c9a1 to-b18960">
            <NavigationBar />
            <div className="flex justify-center">
                <div className="py-6 w-full max-w-lg">
                    <div className="bg-gray-100 shadow-lg rounded-lg px-8 py-10">
                        <h1 className="text-2xl font-semibold text-center">Admin Dashboard</h1>
                        <div className="mt-6">
                            <input
                                type="text"
                                placeholder="User Email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                            />
                            <button
                                onClick={handlePasswordReset}
                                className="w-full px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                Reset Password
                            </button>
                            {message && (
                                <div className={`mt-4 text-sm font-medium ${isError ? 'text-red-600' : 'text-green-600'}`}>
                                    {message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;









