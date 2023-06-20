import React from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'

const FacultyStatistics = ({data}) => {

    return (
        <div className="flex flex-wrap mt-8 p-6 md:p-4 gap-4 sm:gap-8 md:gap-12">
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                        <IoBagHandle className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">Total Classes to Teach</span>
                        <div className="flex items-center">
                            <strong className="text-xl text-gray-700 font-semibold">{data?.statistics ?data.statistics.classesToTeachByYearID:0}</strong>
                        </div>
                    </div>
                </BoxWrapper>
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                        <IoPieChart className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">Total Subjects</span>
                        <div className="flex items-center">
                            <strong className="text-xl text-gray-700 font-semibold">{data?.statistics ?data.statistics.subjectsByYearID:0}</strong>
                        </div>
                    </div>
                </BoxWrapper>
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
                        <IoPeople className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">Total Class Incharges</span>
                        <div className="flex items-center">
                            <strong className="text-xl text-gray-700 font-semibold">{data?.statistics ?data.statistics.classIncharges:0}</strong>
                        </div>
                    </div>
                </BoxWrapper>
            </div>
      )
}

function BoxWrapper({ children }) {
	return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}

export default FacultyStatistics