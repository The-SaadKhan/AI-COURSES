import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { desc, eq, ne, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { currentUser } from '@clerk/nextjs/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams?.get('courseId');
    const userEmail = searchParams?.get('userEmail');
    const user = await currentUser();

    if (courseId == 0) {
        // Get courses with generated content only
        const result = await db.select().from(coursesTable)
            .where(sql`${coursesTable.courseContent}::jsonb != '{}'::jsonb`);
        console.log(result)   
        return NextResponse.json(result);
    }

    if (courseId) {
        const result = await db.select().from(coursesTable)
            .where(eq(coursesTable.cid, courseId));
        console.log(result)   
        return NextResponse.json(result[0]);
    }
    
    // Handle userEmail parameter for filtering by user with content
    if (userEmail) {
        const result = await db.select().from(coursesTable)
            .where(
                sql`${coursesTable.userEmail} = ${userEmail} AND ${coursesTable.courseContent}::jsonb != '{}'::jsonb`
            )
            .orderBy(desc(coursesTable.id));
        console.log(result)   
        return NextResponse.json(result);
    }
    
    else {
        // Default: show user's courses with content only
        const result = await db.select().from(coursesTable)
            .where(
                sql`${coursesTable.userEmail} = ${user.primaryEmailAddress?.emailAddress} AND ${coursesTable.courseContent}::jsonb != '{}'::jsonb`
            )
            .orderBy(desc(coursesTable.id));
        console.log(result)   
        return NextResponse.json(result);
    }
}
