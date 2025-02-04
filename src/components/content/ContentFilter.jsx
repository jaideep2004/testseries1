// components/content/ContentFilter.jsx
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const ContentFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    type: '',
    subjectId: '',
    classId: '',
    priceRange: '',
    sort: 'newest'
  });

  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const [subjectsRes, classesRes] = await Promise.all([
        api.get('/admin/subjects'),
        api.get('/admin/classes')
      ]);
      setSubjects(subjectsRes.data);
      setClasses(classesRes.data);
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      type: '',
      subjectId: '',
      classId: '',
      priceRange: '',
      sort: 'newest'
    });
    onFilter({});
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content Type
          </label>
          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">All Types</option>
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
            <option value="quiz">Quiz</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <select
            name="subjectId"
            value={filters.subjectId}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Class
          </label>
          <select
            name="classId"
            value={filters.classId}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">All Classes</option>
            {classes.map(cls => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <select
            name="priceRange"
            value={filters.priceRange}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">All Prices</option>
            <option value="free">Free</option>
            <option value="0-500">₹0 - ₹500</option>
            <option value="501-1000">₹501 - ₹1000</option>
            <option value="1001+">₹1001+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            name="sort"
            value={filters.sort}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-4">
        <button
          onClick={handleReset}
          className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
        >
          Reset
        </button>
        <button
          onClick={handleApplyFilters}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};
export default ContentFilter