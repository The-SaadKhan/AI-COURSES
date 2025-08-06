import { integer, pgTable, varchar, boolean, json } from "drizzle-orm/pg-core";

// USERS TABLE
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  subscriptionId: varchar({ length: 255 }),
});

// COURSES TABLE
export const coursesTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }),
  description: varchar({ length: 255 }),
  noOfChapters: integer().notNull(),
  includeVideo: boolean().default(false),
  level: varchar({ length: 255 }).notNull(),
  catetgory: varchar({ length: 255 }),
  courseJson: json(),
  bannerImageUrl: varchar({ length: 255 }).default(''),
  courseContent: json().default({}),
  userEmail: varchar({ length: 255 }).references(() => usersTable.email).notNull()
});

// ENROLL COURSE TABLE
export const enrollCourseTable = pgTable("enrollCourse", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar({ length: 255 }).references(() => coursesTable.cid).notNull(),
  userEmail: varchar({ length: 255 }).references(() => usersTable.email).notNull(),
  completedChapters: json()
});
