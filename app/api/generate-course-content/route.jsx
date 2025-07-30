import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";

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
    const tools = [{ googleSearch: {} }];
    const config = { tools };
    const model = 'gemini-2.0-flash';

    const contents = [
      {
        role: 'user',
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

    const RawResp = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    const RawJson = RawResp?.replace(/```json|```/g, "").trim();

    let JSONResp;
    try {
      JSONResp = JSON.parse(RawJson);
    } catch (err) {
      console.error("❌ Failed to parse JSON from Gemini:", err);
      console.log("🔎 RawJson was:", RawResp);
      throw new Error("Gemini did not return valid JSON.");
    }

    return JSONResp;
  });

  const CourseContent = await Promise.all(promises);

  return NextResponse.json({
    courseName: courseTitle,
    CourseContent,
  });
}
