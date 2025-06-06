import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import { useDarkMode } from '../Common/useDarkMode';
import Sidebar from '../Common/Sidebar';
import ToggleButton from '../ui/ToggleButton';
import { showSuccessAlert, showErrorAlert } from '../../utils/sweetAlert';

/**
 * Profile page component for user profile management
 * @returns {React.ReactNode} - The profile page component
 */
const Profile = () => {
  const { user, updateProfile, isAdmin, isTeacher, isStudent, refreshUserData } = useAuth();
  const { sidebarCollapsed } = useUI();
  const { isDarkMode, handleToggle } = useDarkMode();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  // Update form data when user changes
  useEffect(() => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(formData);
      await refreshUserData(); // Refresh user data after update
      showSuccessAlert('Success', 'Profile updated successfully!');
    } catch (err) {
      showErrorAlert('Error', err.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen surface-secondary">
      {/* Sidebar component handles both mobile and desktop sidebars */}
      <Sidebar mobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />

      {/* Main content */}
      <div
        className={`${
          sidebarCollapsed ? 'md:pl-16' : 'md:pl-64'
        } flex flex-col flex-1 transition-all duration-300 ease-in-out`}
      >
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-primary transition-all duration-300">
                    <div className="h-16 px-4 md:px-6 pr-16 md:pr-6 flex items-center justify-between">
                        <div className="flex-1 flex items-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent dark:from-indigo-400 dark:to-indigo-200 transition-colors duration-300">
                                Profile
                            </h1>
                        </div>
                        <div className="hidden md:flex items-center space-x-6">
                            {/* User Profile */}
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center ring-2 ring-white dark:ring-slate-700 transform hover:scale-105 transition-all duration-200">
                                        <span className="text-sm font-semibold text-white">
                                            {user?.firstName?.charAt(0)}
                                            {user?.lastName?.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-400 border-2 border-white dark:border-slate-700"></div>
                                </div>
                                <div className="block">
                                    <p className="text-sm font-medium text-primary">
                                        {user?.firstName} {user?.lastName}
                                    </p>
                                    <p className="text-xs text-muted">
                                        {isAdmin() ? 'Administrator' : isTeacher() ? 'Teacher' : 'Student'}
                                    </p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-6 w-px bg-gray-200 dark:bg-slate-700"></div>

                            {/* Dark Mode Toggle */}
                            <ToggleButton
                                isChecked={isDarkMode}
                                onChange={handleToggle}
                                className="transform hover:scale-105 transition-transform duration-200"
                            />
                        </div>
                    </div>
                </header>

        <main className="animate-fadeIn flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="surface-primary shadow-sm overflow-hidden sm:rounded-xl border border-primary">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-primary">
                    User Information
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-secondary">
                    Update your personal details.
                  </p>
                </div>
                <div className="border-t border-primary px-4 py-5 sm:p-6">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                      <div className="relative">
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="First name"
                          className="peer w-full px-4 py-3.5 border border-primary rounded-lg text-primary placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200 surface-primary"
                        />
                        <label
                          htmlFor="firstName"
                          className="absolute left-4 -top-2.5 surface-primary px-1 text-sm text-secondary transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400"
                        >
                          First name
                        </label>
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Last name"
                          className="peer w-full px-4 py-3.5 border border-primary rounded-lg text-primary placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200 surface-primary"
                        />
                        <label
                          htmlFor="lastName"
                          className="absolute left-4 -top-2.5 surface-primary px-1 text-sm text-secondary transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400"
                        >
                          Last name
                        </label>
                      </div>

                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email address"
                          className="peer w-full px-4 py-3.5 border border-primary rounded-lg text-primary placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200 surface-primary"
                        />
                        <label
                          htmlFor="email"
                          className="absolute left-4 -top-2.5 surface-primary px-1 text-sm text-secondary transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400"
                        >
                          Email address
                        </label>
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone number"
                          className="peer w-full px-4 py-3.5 border border-primary rounded-lg text-primary placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200 surface-primary"
                        />
                        <label
                          htmlFor="phone"
                          className="absolute left-4 -top-2.5 surface-primary px-1 text-sm text-secondary transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-muted peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400"
                        >
                          Phone number
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3.5 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Saving Changes...</span>
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;