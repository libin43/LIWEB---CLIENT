import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetDashboardAdmissionGraphQuery } from '../../../api/schoolAdmin/apiSlice';

const AdmissionChart = () => {
  const [startIndex, setStartIndex] = useState(0);
  const admissionGraphQuery = useGetDashboardAdmissionGraphQuery({ startIndex });
  const data = admissionGraphQuery.data?.admissions[0]?.data || [];
  const totalYear = admissionGraphQuery.data?.admissions[0]?.totalCount[0]?.count || 0;

  const handlePrevYears = () => {
      setStartIndex(prevIndex => prevIndex +3);
  };

  const handleNextYears = () => {
      setStartIndex(prevIndex => prevIndex - 3);
  };

  if (admissionGraphQuery.isLoading) {
    return (
      <div
        role="status"
        className="w-full p-4 rounded shadow animate-pulse md:p-20 "
      >
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5" />
        <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700" />
        <div className="flex items-baseline mt-4 space-x-6">
          <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700" />
          <div className="w-full h-56 bg-gray-200 rounded-t-lg dark:bg-gray-700" />
          <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700" />
          <div className="w-full h-64 bg-gray-200 rounded-t-lg dark:bg-gray-700" />
          <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700" />
          <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700" />
          <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700" />
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (admissionGraphQuery.isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
        <p className="text-lg text-gray-600">We encountered an error while fetching data.</p>
      </div>
    );
  }

  const transformedData = data.map(admission => ({
    startDate: new Date(admission.startDate).toDateString(),
    admissions: admission.newAdmissions,
  }));

  return (
    <>
      <div className="flex justify-center mb-4">
        <button
          className="mr-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          onClick={handlePrevYears}
          disabled={startIndex >= totalYear}
          title="previous"
        >
          <FaChevronLeft />
        </button>
        <button
          className="ml-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          onClick={handleNextYears}
          disabled={startIndex == 0}
          title="next"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
        <strong className="text-gray-700 font-medium">Admission Analysis</strong>
        <div className="mt-3 w-full flex-1 text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={transformedData}
              margin={{
                top: 20,
                right: 10,
                left: -10,
                bottom: 0
              }}
            >
              <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
              <XAxis dataKey="startDate" />
              <YAxis dataKey="admissions" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="admissions" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default AdmissionChart;
