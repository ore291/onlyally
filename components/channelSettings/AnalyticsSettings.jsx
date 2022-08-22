import React from 'react'

const AnalyticsSettings = () => {
  return (
    <div className="max-w-6xl mx-auto">
        <div className="w-full  border-b-2  py-3">
            <h1 className="text-2xl font-medium">
                Group Analytics
            </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 md:gap-y-10  gap-x-2 my-4">
            <div className="w-full border shadow-md md:shadow-2xl space-x-3 flex items-center px-4 py-2 ">
                <div className="bg-teal-500 w-5 h-16" />
                <div className="flex flex-col items-start justify-center">
                    <span className="font-medium text-gray-500 text-lg">Total PPV Earnings</span>
                    <span className="font-medium text-gray-500 text-lg">&#8358;0.00</span>
                </div>

            </div>
            <div className="w-full border shadow-md md:shadow-2xl space-x-3 flex items-center px-4 py-2 ">
                <div className="bg-yellow-500 w-5 h-16" />
                <div className="flex flex-col items-start justify-center">
                    <span className="font-medium text-gray-500 text-lg">Today Earnings</span>
                    <span className="font-medium text-gray-500 text-lg">&#8358;0.00</span>
                </div>

            </div>
            <div className="w-full border shadow-md md:shadow-2xl space-x-3 flex items-center px-4 py-2 ">
                <div className="bg-blue-500 w-5 h-16" />
                <div className="flex flex-col items-start justify-center">
                    <span className="font-medium text-gray-500 text-lg">Total Likes</span>
                    <span className="font-medium text-gray-500 text-lg">0</span>
                </div>

            </div>
            <div className="w-full border shadow-md md:shadow-2xl space-x-3 flex items-center px-4 py-2 ">
                <div className="bg-green-600 w-5 h-16" />
                <div className="flex flex-col items-start justify-center">
                    <span className="font-medium text-gray-500 text-lg">Tips Earnings</span>
                    <span className="font-medium text-gray-500 text-lg">&#8358;0.00</span>
                </div>

            </div>
            <div className="w-full border shadow-md md:shadow-2xl space-x-3 flex items-center px-4 py-2 ">
                <div className="bg-red-500 w-5 h-16" />
                <div className="flex flex-col items-start justify-center">
                    <span className="font-medium text-gray-500 text-lg">Total Earnings</span>
                    <span className="font-medium text-gray-500 text-lg">&#8358;0.00</span>
                </div>

            </div>
            <div className="w-full border shadow-md md:shadow-2xl space-x-3 flex items-center px-4 py-2 ">
                <div className="bg-green-400 w-5 h-16" />
                <div className="flex flex-col items-start justify-center">
                    <span className="font-medium text-gray-500 text-lg">Total Posts</span>
                    <span className="font-medium text-gray-500 text-lg">0</span>
                </div>

            </div>
        </div>
    </div>
  )
}

export default AnalyticsSettings