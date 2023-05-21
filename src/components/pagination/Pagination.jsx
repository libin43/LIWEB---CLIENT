import React from 'react'
import {Pagination} from 'flowbite-react'

const Paginate = ({currentPage, onPageChange, totalPages}) => {
  return (
      <>
          <Pagination
              currentPage={currentPage}
              onPageChange={onPageChange}
              showIcons={true}
              totalPages={totalPages}
              className="my-4 md:flex-row md:justify-center lg:flex-col lg:justify-start"

          />
      </>
  )
}

export default Paginate;