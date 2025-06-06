import { default as authApi } from './authService';

/**
 * Get all courses for the authenticated user
 * @returns {Promise} - Array of courses for the authenticated user, empty array if no courses
 */
export const getUserCourses = async () => {
    try {
        console.log('Fetching user courses');
        const response = await authApi.get('/api/courses/me');
        console.log('User courses fetched successfully:', response.data);
        return response.data || []; // Return empty array if no data
    } catch (error) {
        console.error('Failed to fetch user courses:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        // If server returns 500 and user has no courses, return empty array
        if (error.response?.status === 500) {
            console.log('No courses found for user, returning empty array');
            return [];
        }
        throw error;
    }
};

/**
 * Get all courses in the system
 * @returns {Promise} - Array of all courses
 */
export const getAllCourses = async () => {
    try {
        console.log('Fetching all courses');
        const response = await authApi.get('/api/courses');
        console.log('All courses fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch all courses:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        throw error;
    }
};

/**
 * Create a new course
 * @param {Object} courseData - The course data
 * @param {string} courseData.name - The name of the course
 * @param {string} courseData.description - The description of the course
 * @returns {Promise} - The created course data
 */
export const createCourse = async (courseData) => {
    try {
        console.log('Creating course with data:', courseData);
        const response = await authApi.post('/api/courses', courseData);
        console.log('Course created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to create course:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        throw error;
    }
};

/**
 * Delete a course by its ID
 * @param {string} courseId - The MongoDB _id of the course to delete
 * @returns {Promise} - The response data from the server
 */
export const deleteCourse = async (courseId) => {
    try {
        console.log('Deleting course with _id:', courseId);
        const response = await authApi.delete(`/api/courses/${courseId}`, {
            data: { id: courseId }
        });
        console.log('Course deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to delete course:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
            courseId
        });
        throw error;
    }
};

