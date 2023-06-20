import React from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'

const DashboardStatsGrid = ({data}) => {
  return (
    <div className="flex flex-wrap gap-4 sm:gap-8 md:gap-12">
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
					<IoBagHandle className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Faculty</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{data.totalFaculty}</strong>
						<span className="text-sm text-green-500 pl-2">+343</span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
					<IoPieChart className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Students</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{data.totalStudent}</strong>
						<span className="text-sm text-green-500 pl-2">-343</span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
					<IoPeople className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Classes</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{data.totalClass}</strong>
						<span className="text-sm text-red-500 pl-2">-30</span>
					</div>
				</div>
			</BoxWrapper>
		</div>
  )
}

function BoxWrapper({ children }) {
	return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}

export default DashboardStatsGrid