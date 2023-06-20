import React from 'react'
import { useParams } from 'react-router-dom'
import ClassOverallResult from '../../../components/faculty/classExamResult/ClassOverallResult'

const ClassResultPage = () => {
    const {classId} = useParams();
  return (
    <div>
        <ClassOverallResult classId = {classId}/>
    </div>
  )
}

export default ClassResultPage