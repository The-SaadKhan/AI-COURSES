"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";
import { Skeleton } from "@/components/ui/skeleton";

function Explore() {
  const [courseList, setCourseList] = useState([]);
  const { user } = useUser();
  
  useEffect(() => {
    user && GetCourseList();
  }, [user]);

  const GetCourseList = async () => {
    // FIX: Use courseId=0 to get all courses with generated content
    const result = await axios.get("/api/courses", {
      params: {
        courseId: 0  // This triggers the "courses with content" filter
      }
    });
    console.log(result.data);
    setCourseList(result.data);
  };

  return (
    <div>
      <h2 className="font-bold text-3xl mb-8">Explore More Courses</h2>
      <div className="flex gap-5 max-w-md">
        <Input placeholder="Search" />
        <Button>
          <Search /> Search
        </Button>
      </div>
      <div className="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {courseList.length>0? courseList?.map((course, index) => (
          <CourseCard course={course} key={index} />
        )):
        [0,1,2,3].map((item,index)=>(
            <Skeleton key={index} className='w-full h-[240px]' />
        ))
        }
      </div>
    </div>
  );
}

export default Explore;
