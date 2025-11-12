import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusIcon, DocumentIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Context
import { AuthContext } from '../context/AuthContext';
import { resumeService } from '../services/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await resumeService.getAll();
        setResumes(res.data || []);
        setError('');
      } catch (err) {
        setError('Failed to fetch resumes: ' + (err.response?.data?.msg || err.message));
        console.error('Dashboard fetch error:', err);
        setResumes([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchResumes();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await resumeService.delete(id);
        setResumes(resumes.filter(resume => resume._id !== id));
      } catch (err) {
        setError('Failed to delete resume');
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-6xl">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">My Resumes</h1>
        <Link
          to="/resume/new"
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Create New Resume
        </Link>
      </div>

      {resumes.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 text-center">
          <DocumentIcon className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400" />
          <h2 className="mt-4 text-lg sm:text-xl font-medium text-gray-800 dark:text-white">No resumes yet</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Create your first resume to get started on your job search journey.
          </p>
          <Link
            to="/resume/new"
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Create New Resume
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {resumes.map((resume) => (
            <motion.div
              key={resume._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2 truncate">
                  {resume.title || 'Untitled Resume'}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 truncate">
                  {resume.personalInfo?.fullName || 'No name provided'}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                  Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 sm:px-6 py-3 flex justify-between items-center">
                <Link
                  to={`/resume/preview/${resume._id}`}
                  className="text-sm sm:text-base text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Preview
                </Link>
                <div className="flex space-x-3 sm:space-x-4">
                  <Link
                    to={`/resume/edit/${resume._id}`}
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(resume._id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;