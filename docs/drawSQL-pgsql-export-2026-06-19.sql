CREATE TABLE "CoursHasCategory"(
    "id" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "categoriesId" INTEGER NOT NULL
);
ALTER TABLE
    "CoursHasCategory" ADD PRIMARY KEY("id");
CREATE TABLE "User"(
    "id" INTEGER NOT NULL,
    "mail" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "firstName" TEXT NULL,
    "lastName" TEXT NULL,
    "password" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL
);
ALTER TABLE
    "User" ADD PRIMARY KEY("id");
ALTER TABLE
    "User" ADD CONSTRAINT "user_mail_unique" UNIQUE("mail");
ALTER TABLE
    "User" ADD CONSTRAINT "user_pseudo_unique" UNIQUE("pseudo");
CREATE TABLE "Course"(
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "shortSummary" TEXT NOT NULL,
    "urlmageSummary" TEXT NULL,
    "authorId" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "longSummary" TEXT NOT NULL,
    "visibility" BOOLEAN NOT NULL
);
ALTER TABLE
    "Course" ADD PRIMARY KEY("id");
ALTER TABLE
    "Course" ADD CONSTRAINT "course_title_unique" UNIQUE("title");
CREATE TABLE "Category"(
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
ALTER TABLE
    "Category" ADD PRIMARY KEY("id");
ALTER TABLE
    "Category" ADD CONSTRAINT "category_name_unique" UNIQUE("name");
CREATE TABLE "CourseContent"(
    "id" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "page" INTEGER NOT NULL,
    "content" TEXT NOT NULL
);
ALTER TABLE
    "CourseContent" ADD PRIMARY KEY("id");
CREATE TABLE "Role"(
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL
);
ALTER TABLE
    "Role" ADD PRIMARY KEY("id");
ALTER TABLE
    "Role" ADD CONSTRAINT "role_title_unique" UNIQUE("title");
CREATE TABLE "Opinion"(
    "id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "note" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL
);
ALTER TABLE
    "Opinion" ADD PRIMARY KEY("id");
CREATE TABLE "Comment"(
    "id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "authiorId" INTEGER NOT NULL
);
ALTER TABLE
    "Comment" ADD PRIMARY KEY("id");
CREATE TABLE "Notification"(
    "id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL
);
ALTER TABLE
    "Notification" ADD PRIMARY KEY("id");
CREATE TABLE "CourActived"(
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "isFinished" BOOLEAN NOT NULL
);
ALTER TABLE
    "CourActived" ADD PRIMARY KEY("id");
CREATE TABLE "Tool"(
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
ALTER TABLE
    "Tool" ADD PRIMARY KEY("id");
ALTER TABLE
    "Tool" ADD CONSTRAINT "tool_name_unique" UNIQUE("name");
CREATE TABLE "CoursHasTool"(
    "id" INTEGER NOT NULL,
    "coursId" INTEGER NOT NULL,
    "toolId" INTEGER NOT NULL
);
ALTER TABLE
    "CoursHasTool" ADD PRIMARY KEY("id");
CREATE TABLE "RefreshToken"(
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL
);
ALTER TABLE
    "RefreshToken" ADD PRIMARY KEY("id");
CREATE TABLE "Badge"(
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
ALTER TABLE
    "Badge" ADD PRIMARY KEY("id");
CREATE TABLE "User_has_badge"(
    "id" INTEGER NOT NULL,
    "userId" BIGINT NOT NULL,
    "badgeId" BIGINT NOT NULL
);
ALTER TABLE
    "User_has_badge" ADD PRIMARY KEY("id");
ALTER TABLE
    "User" ADD CONSTRAINT "user_id_foreign" FOREIGN KEY("id") REFERENCES "Course"("authorId");
ALTER TABLE
    "Course" ADD CONSTRAINT "course_id_foreign" FOREIGN KEY("id") REFERENCES "CoursHasTool"("toolId");
ALTER TABLE
    "User" ADD CONSTRAINT "user_id_foreign" FOREIGN KEY("id") REFERENCES "Notification"("userId");
ALTER TABLE
    "Course" ADD CONSTRAINT "course_id_foreign" FOREIGN KEY("id") REFERENCES "Notification"("courseId");
ALTER TABLE
    "Course" ADD CONSTRAINT "course_id_foreign" FOREIGN KEY("id") REFERENCES "Opinion"("courseId");
ALTER TABLE
    "Course" ADD CONSTRAINT "course_id_foreign" FOREIGN KEY("id") REFERENCES "CourseContent"("courseId");
ALTER TABLE
    "Course" ADD CONSTRAINT "course_id_foreign" FOREIGN KEY("id") REFERENCES "CourActived"("courseId");
ALTER TABLE
    "User_has_badge" ADD CONSTRAINT "user_has_badge_badgeid_foreign" FOREIGN KEY("badgeId") REFERENCES "Badge"("id");
ALTER TABLE
    "Role" ADD CONSTRAINT "role_id_foreign" FOREIGN KEY("id") REFERENCES "User"("roleId");
ALTER TABLE
    "User" ADD CONSTRAINT "user_id_foreign" FOREIGN KEY("id") REFERENCES "Comment"("authiorId");
ALTER TABLE
    "User" ADD CONSTRAINT "user_id_foreign" FOREIGN KEY("id") REFERENCES "Opinion"("userId");
ALTER TABLE
    "Category" ADD CONSTRAINT "category_id_foreign" FOREIGN KEY("id") REFERENCES "CoursHasCategory"("categoriesId");
ALTER TABLE
    "Course" ADD CONSTRAINT "course_id_foreign" FOREIGN KEY("id") REFERENCES "Comment"("courseId");
ALTER TABLE
    "Course" ADD CONSTRAINT "course_id_foreign" FOREIGN KEY("id") REFERENCES "CoursHasCategory"("courseId");
ALTER TABLE
    "User" ADD CONSTRAINT "user_id_foreign" FOREIGN KEY("id") REFERENCES "CourActived"("userId");
ALTER TABLE
    "RefreshToken" ADD CONSTRAINT "refreshtoken_userid_foreign" FOREIGN KEY("userId") REFERENCES "User"("id");
ALTER TABLE
    "User_has_badge" ADD CONSTRAINT "user_has_badge_userid_foreign" FOREIGN KEY("userId") REFERENCES "User"("id");
ALTER TABLE
    "Tool" ADD CONSTRAINT "tool_id_foreign" FOREIGN KEY("id") REFERENCES "CoursHasTool"("toolId");