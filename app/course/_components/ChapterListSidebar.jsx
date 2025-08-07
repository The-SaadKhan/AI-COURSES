import React, { useContext } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";

function ChapterListSidebar({ courseInfo }) {
  const course = courseInfo?.courses;
  const enrollCourse = courseInfo?.enrollCourse;
  const courseContent = courseInfo?.courses?.courseContent;
  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(
    SelectedChapterIndexContext
  );
  let completedChapter = enrollCourse?.completedChapters ?? [];

  return (
    <div className="w-80 bg-secondary h-screen p-5">
      <h2 className="my-3 font-bold text-xl">
        Chapters ({courseContent?.length})
      </h2>

      {courseContent?.length > 0 ? (
        <Accordion type="single" collapsible>
          {courseContent.map((chapter, index) => (
            <AccordionItem
              value={`chapter-${index}`}
              key={index}
              onClick={() => setSelectedChapterIndex(index)}
            >
              <AccordionTrigger
                className={`text-lg font-medium px-5 ${
                        completedChapter.includes(index)
                          ? "bg-green-100 text-green-800"
                          : ""
                      }`}
              >
                <span></span>
                {index + 1}. {chapter?.courseData?.[0]?.chapterName}
              </AccordionTrigger>
              <AccordionContent asChild>
                <div>
                  {chapter?.courseData?.map((topic, _index) => (
                    <h2
                      key={_index}
                      className={`p-3 my-1 rounded-lg${
                        completedChapter.includes(index)
                          ? "bg-green-100 text-green-800"
                          : "bg-white"
                      }`}
                    >
                      {topic?.topic}
                    </h2>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className="text-gray-500">No chapters available</p>
      )}
    </div>
  );
}

export default ChapterListSidebar;
