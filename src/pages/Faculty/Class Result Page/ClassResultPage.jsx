import React from 'react'
import ClassOverallResult from '../../../components/faculty/classExamResult/ClassOverallResult'
import { useParams } from 'react-router-dom'

const ClassResultPage = () => {
    console.log('called claass res page');
    const {classId} = useParams();
    console.log(classId,'dclass id');
  return (
    <div>
        <ClassOverallResult classId = {classId}/>
    </div>
  )
}

export default ClassResultPage