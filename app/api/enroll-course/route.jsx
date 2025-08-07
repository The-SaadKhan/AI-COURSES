import { db } from "@/config/db";
import { coursesTable, enrollCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { courseId } = await req.json();
  const user = await currentUser();

  const enrollCourses = await db
    .select()
    .from(enrollCourseTable)
    .where(
      and(
        eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress),
        eq(enrollCourseTable.cid, courseId)
      )
    );

  if (enrollCourses?.length == 0) {
    const result = await db
      .insert(enrollCourseTable)
      .values({
        cid: courseId,
        userEmail: user.primaryEmailAddress?.emailAddress,
        completedChapters: [], // FIX 4: Initialize as empty array
      })
      .returning(enrollCourseTable);
    return NextResponse.json(result);
  }
  return NextResponse.json({ resp: "Already Enrolled" });
}


export async function GET(req) {
  const user = await currentUser();
  const { searchParams } = new URL(req.url);
  const courseId = searchParams?.get("courseId");

  if (courseId) {
    const result = await db
      .select()
      .from(coursesTable)
      .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
      .where(
        and(
          eq(
            enrollCourseTable.userEmail,
            user?.primaryEmailAddress.emailAddress
          ),
          eq(enrollCourseTable.cid, courseId)
        )
      );
    return NextResponse.json(result[0]);
  } else {
    const result = await db
      .select()
      .from(coursesTable)
      .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
      .where(
        eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress)
      )
      .orderBy(desc(enrollCourseTable.id));

    return NextResponse.json(result);
  }
}

export async function PUT(req) {
  try {
    const { completedChapter, completedChapters, courseId, action } = await req.json();
    const user = await currentUser();
    
    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }
    
    // Get current enrollment
    const currentEnrollment = await db
      .select()
      .from(enrollCourseTable)
      .where(
        and(
          eq(enrollCourseTable.cid, courseId),
          eq(enrollCourseTable.userEmail, user.primaryEmailAddress.emailAddress)
        )
      );

    if (currentEnrollment.length === 0) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }

    // Handle removal (mark incomplete)
    if (action === 'remove' && Array.isArray(completedChapters)) {
      const result = await db
        .update(enrollCourseTable)
        .set({
          completedChapters: completedChapters,
        })
        .where(
          and(
            eq(enrollCourseTable.cid, courseId),
            eq(enrollCourseTable.userEmail, user.primaryEmailAddress.emailAddress)
          )
        )
        .returning(enrollCourseTable);
        
      return NextResponse.json(result);
    }

    // Handle addition (mark complete)
    const currentCompleted = currentEnrollment[0].completedChapters || [];
    
    // Only add if not already completed
    if (!currentCompleted.includes(completedChapter)) {
      const updatedCompleted = [...currentCompleted, completedChapter];
      
      const result = await db
        .update(enrollCourseTable)
        .set({
          completedChapters: updatedCompleted,
        })
        .where(
          and(
            eq(enrollCourseTable.cid, courseId),
            eq(enrollCourseTable.userEmail, user.primaryEmailAddress.emailAddress)
          )
        )
        .returning(enrollCourseTable);
        
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ message: 'Chapter already completed' });
    }
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}



