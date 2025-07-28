import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse} from "next/server";
import { use } from "react";


export async function POST(req){
    const { email, name } = await req.json();

    // IF USER EXISTS
    const users=await db.select().from(usersTable).where(eq(usersTable.email, email)) 


    // IF USER DOES NOT EXIST
    if(users?.length==0){
        const result=await db.insert(usersTable).values({
            name:name,
            email:email,
        }).returning(usersTable);
        console.log(result);
        return NextResponse.json(result);
    }



    return NextResponse.json(users[0]);
}