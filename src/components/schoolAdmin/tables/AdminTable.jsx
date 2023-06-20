import React from 'react'
import { Spinner } from 'flowbite-react';
import { Table } from 'flowbite-react'

const AdminTable = ({data, isLoading, isError, error,}) => {
    if(isLoading){
        return (
        <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
        </div>
        )
    }
    else if(isError){
        if(error?.status === 401){
            toast.warn('Unauthorized Access', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                })
                localStorage.removeItem('schoolAdminToken');
                navigate('/school_admin/login')
        }
    }
    else if(data){
        return (
            <>
              <Table.Body className="divide-y">
                {data && data.subjects.length !== 0 ? (
                  data.subjects.map((subjects, index) => (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      key={index}
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {subjects.subjectCode}
                      </Table.Cell>
                      <Table.Cell>{subjects.subjectName}</Table.Cell>
                      <Table.Cell>{subjects.facultyID.facultyName}</Table.Cell>
          
                      <Table.Cell>
                        <a
                          href="/tables"
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          Edit
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"></Table.Cell>
                    <Table.Cell>Add Subject</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </>
          ); 
    }
}

export default AdminTable