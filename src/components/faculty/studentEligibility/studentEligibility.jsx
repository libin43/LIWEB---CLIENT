import React from 'react'

const studentEligibility = ({ students, eligibilityStatus }) => {
    return (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">
            {eligibilityStatus ? 'Eligible Students' : 'Non-Eligible Students'}
          </h2>
          <ul className="list-disc ml-6">
            {students.map((student, index) => (
              <li key={index} className="mb-2">
                {student.studentName} - {Math.round(student.percentage)}%
              </li>
            ))}
          </ul>
        </div>
      )
}

export default studentEligibility