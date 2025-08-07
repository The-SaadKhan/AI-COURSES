// "use client"
// import AppHeader from '@/app/workspace/_components/AppHeader'
// import React, { useState } from 'react'
// import ChapterListSidebar from '../_components/ChapterListSidebar'
// import ChapterContent from './../_components/ChapterContent';
// import { useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import axios from "axios";

// function Course() {
//   const {courseId} = useParams();
//   const [courseInfo,setcourseInfo]=useState()
  
//   useEffect(() => {
//       GetEnrolledCourseById();
//     }, []);

//     const GetEnrolledCourseById = async () => {
//       try {
//         const result = await axios.get('/api/enroll-course?courseId='+courseId);
//         console.log(result.data);
//         setcourseInfo(result.data);
//       } catch (error) {
//         console.error('Error fetching course:', error);
//         // You can add additional error handling here if needed
//       }
//     };

//   return (
//     <div>
//         <AppHeader hideSidebar={true} />
//         <div className='flex gap-10' >
//             <ChapterListSidebar courseInfo={courseInfo} />
//             <ChapterContent courseInfo={courseInfo} refreshData={()=>GetEnrolledCourseById()}/>
//         </div>
//     </div>
//   )
// }

// export default Course

"use client"
import AppHeader from '@/app/workspace/_components/AppHeader'
import React, { useState } from 'react'
import ChapterListSidebar from '../_components/ChapterListSidebar'
import ChapterContent from './../_components/ChapterContent';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from "axios";

function Course() {
  const {courseId} = useParams();
  const [courseInfo, setCourseInfo] = useState()
  
  useEffect(() => {
    GetEnrolledCourseById();
  }, []);

  const GetEnrolledCourseById = async () => {
    try {
      console.log("Fetching course data for courseId:", courseId); // Debug log
      const result = await axios.get('/api/enroll-course?courseId=' + courseId);
      console.log("Course data received:", result.data); // Debug log
      setCourseInfo(result.data);
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  // Explicit refreshData function for clarity
  const refreshData = async () => {
    console.log("Refreshing course data..."); // Debug log
    await GetEnrolledCourseById();
  };

  return (
    <div>
      <AppHeader hideSidebar={true} />
      <div className='flex gap-10'>
        <ChapterListSidebar courseInfo={courseInfo} />
        <ChapterContent 
          courseInfo={courseInfo} 
          refreshData={refreshData} 
        />
      </div>
    </div>
  )
}

export default Course

