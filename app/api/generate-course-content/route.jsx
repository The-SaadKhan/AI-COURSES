import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import axios from "axios";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";

const PROMPT = `
You are an AI content generator.

🛑 DO NOT add any explanation or text. Only return valid JSON.

Generate HTML content for each topic based on the chapter name and topic list.

Return response strictly in this format:

[
  {
    "chapterName": "<string>",
    "topic": "<string>",
    "content": "<p>HTML content...</p>"
  }
]

Input:
`;

export async function POST(req) {
  const { courseJson, courseTitle, courseId } = await req.json();

  const promises = courseJson?.chapters?.map(async (chapter) => {
    try {
      const tools = [{ googleSearch: {} }];
      const config = { tools };
      const model = "gemini-2.0-flash";

      const contents = [
        {
          role: "user",
          parts: [
            {
              text: PROMPT + JSON.stringify(chapter),
            },
          ],
        },
      ];

      const response = await ai.models.generateContent({
        model,
        config,
        contents,
      });

      let RawResp = response?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

      // ✅ Clean the response string
      let RawJson = RawResp
        .replace(/^.*?(\[\s*{)/s, "$1")
        .replace(/(\}]\s*)[^]*$/, "$1")
        .replace(/```json|```/g, "")
        .trim();

      console.log("🧾 Cleaned RawJson (preview):", RawJson.slice(0, 300));

      // ✅ Try to parse the JSON
      let JSONResp;
      try {
        JSONResp = JSON.parse(RawJson);
      } catch (err) {
        console.error("❌ Failed to parse Gemini response:", err.message);
        console.log("🔎 Raw JSON:", RawJson);
        throw new Error("Gemini did not return valid JSON.");
      }

      const youtubeData = await GetYoutubeVideo(chapter?.chapterName);

      return {
        youtubeVideo: youtubeData,
        courseData: JSONResp,
      };

    } catch (err) {
      console.error("🔥 Error generating content for chapter:", chapter?.chapterName, err.message);
      return {
        youtubeVideo: [],
        courseData: [],
        error: err.message,
      };
    }
  });

  const CourseContent = await Promise.all(promises);


  // SAVE
  const dbResp= await db.update(coursesTable).set({
    courseContent: CourseContent,
  }).where(eq(coursesTable.cid,courseId))

  console.log("✅ Final Course Content", CourseContent);

  return NextResponse.json({
    courseName: courseTitle,
    CourseContent,
  });
}

// ✅ YouTube Video Fetch Function
const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const GetYoutubeVideo = async (topic) => {
  try {
    const params = {
      part: "snippet",
      q: topic,
      maxResults: 4,
      type: "video",
      key: process.env.YOUTUBE_API_KEY,
    };  

    const resp = await axios.get(YOUTUBE_BASE_URL, { params });
    const youtubeVideoListResp = resp.data.items;

    const youtubeVideoList = youtubeVideoListResp.map((item) => ({
      videoId: item.id?.videoId,
      title: item.snippet?.title,
    }));

    console.log("🎥 youtubeVideoList", youtubeVideoList);
    return youtubeVideoList;
  } catch (err) {
    console.error("❌ YouTube API error:", err.message);
    return [];
  }
};
