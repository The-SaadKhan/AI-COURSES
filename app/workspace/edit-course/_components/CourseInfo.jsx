import { Button } from '@/components/ui/button';
import { Book, Clock, Settings, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


function CourseInfo({course}) {
  const [loading,setLoading]=useState(false)
  const courseLayout=course?.courseJson?.course;
  const router = useRouter();

  const GenerateCourseContent=async()=>{
    // Call API to Generate Course Content

    setLoading(true)
    try{
      const result = await axios.post('/api/generate-course-content',{
        courseJson:courseLayout,
        courseTitle:course?.name,
        courseId:course?.cid
      })
      console.log(result.data)
      setLoading(false)
      router.replace('/workspace')
      toast.success("Course Generated Successfully")
    }
    catch(error){
      console.log(error)
      setLoading(false)
      toast.error("Server Side error,Try Agian")
    }

  }

  return (
    <div className='  md:flex gap-5 justify-between p-5 rounded-2xl shadow ' >
      <div className='flex flex-col gap-3'>
        <h2 className='font-bold text-3xl' >
          {courseLayout?.name}
        </h2>
        <p className='line-clamp-2 text-gray-500' >{courseLayout?.description}</p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5' >
          <div className='flex gap-5 items-center p-3 rounded-lg shadow ' >
            <Clock className='text-blue-500' />
            <section>
              <h2 className='font-bold' >Duration</h2>
              <h2>2 Hours</h2>
            </section>
          </div>
          <div className='flex gap-5 items-center p-3 rounded-lg shadow ' >
            <Book className='text-green-500' />
            <section>
              <h2 className='font-bold' >Chapters</h2>
              <h2>2 Hours</h2>
            </section>
          </div>
          <div className='flex gap-5 items-center p-3 rounded-lg shadow ' >
            <TrendingUp className='text-red-500' />
            <section>
              <h2 className='font-bold' >Difficulty Level</h2>
              <h2>{course?.level}</h2>
            </section>
          </div>
        </div>
        {/* <Button className={'max-w-sm'} >
          <Settings/> Generate Content
        </Button> */}
        <Button className={'max-w-sm'} onClick={GenerateCourseContent} disabled={loading}>
  {loading ? (
    <span>Generating...</span>
  ) : (
    <>
      <Settings className="mr-2" /> Generate Content
    </>
  )}
</Button>

      </div>
      <Image src={course?.bannerImageUrl} alt={'banner image'} width={400} height={400} className='w-full mt-5 md:mt-0 object-cover aspect-auto h-[240px] rounded-2xl ' />
    </div>
  )
}

export default CourseInfo