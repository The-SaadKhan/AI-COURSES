import { Button } from "@/components/ui/button";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";
import axios from "axios";
import { CheckCircle, Loader2Icon, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useContext, useState } from "react";
import YouTube from "react-youtube";
import { toast } from "sonner";

function ChapterContent({ courseInfo, refreshData }) {
  const courseId = useParams();
  const { courses, enrollCourse } = courseInfo ?? {};
  const courseContent = courseInfo?.courses?.courseContent;
  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(
    SelectedChapterIndexContext
  );
  const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
  const topics = courseContent?.[selectedChapterIndex]?.courseData;
  
  // FIX 1: Use correct field name and access nested structure
  let completedChapter = enrollCourse?.completedChapters ?? [];
  const [loading, setLoading] = useState(false);

  const markChapterCompleted = async () => {
    try {
      setLoading(true);
      
      // FIX 2: Send only the chapter index, let API handle appending
      const result = await axios.put("/api/enroll-course", {
        courseId: courseId.courseId,
        completedChapter: selectedChapterIndex,
      });
      
      console.log(result);
      await refreshData();
      toast.success("Chapter Marked Completed!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to mark chapter as completed");
    } finally {
      setLoading(false);
    }
  };

  const markInCompleteChapter = async () => {
    try {
      setLoading(true);

      const completeChap = completedChapter.filter(item => item !== selectedChapterIndex);
      
      const result = await axios.put("/api/enroll-course", {
        courseId: courseId.courseId,
        completedChapters: completeChap, // Send filtered array
        action: 'remove' // Flag for removal
      });
      
      console.log(result);
      await refreshData();
      toast.success("Chapter Marked Incomplete!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to mark chapter as incomplete");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 flex-1">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">
          {selectedChapterIndex + 1}.
          {courseContent?.[selectedChapterIndex]?.courseData?.[0]?.chapterName}
        </h2>
        {!completedChapter?.includes(selectedChapterIndex) ? (
          <Button onClick={markChapterCompleted} disabled={loading}>
            {loading ? <Loader2Icon className="animate-spin"/> : <CheckCircle />}
            Mark As Completed
          </Button>
        ) : (
          // FIXED: Removed extra curly brace
          <Button variant="outline" onClick={markInCompleteChapter} disabled={loading}>
            {loading ? <Loader2Icon className="animate-spin"/> : <X />}
            Mark Incomplete
          </Button>
        )}
      </div>
      
      <h2 className="my-2 font-bold text-lg">Related Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {videoData?.map(
          (video, index) =>
            index < 2 && (
              <div key={index}>
                <YouTube
                  videoId={video?.videoId}
                  opts={{
                    height: "250",
                    width: "400",
                  }}
                />
              </div>
            )
        )}
      </div>
      
      <div className="mt-7">
        {topics?.map((topic, index) => (
          <div key={index} className="mt-10 p-5 bg-secondary rounded-2xl">
            <h2 className="font-bold text-2xl text-primary">
              {index + 1}. {topic?.topic}
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: topic?.content }}
              style={{
                lineHeight: "2.5",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;
