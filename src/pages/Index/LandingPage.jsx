import React from 'react'
import { Link } from 'react-router-dom';
import { FaUser, FaChalkboardTeacher } from 'react-icons/fa';

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">LIWEB MANAGE SCHOOLS</h1>
            <div className="flex space-x-4">
                <Link
                    to="/faculty/login"
                    className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    <FaChalkboardTeacher className="mr-2" />
                    Faculty Login
                </Link>
                <Link
                    to="/school_admin/login"
                    className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    <FaUser className="mr-2" />
                    Admin Login
                </Link>
            </div>
        </div>
    )
}

export default LandingPage