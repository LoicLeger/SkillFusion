CREATE TABLE "UserHasBadge"(
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "badgeId" INTEGER NOT NULL
);
ALTER TABLE
    "UserHasBadge" ADD PRIMARY KEY("id");
CREATE TABLE "UserHasCours"(
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "coursId" INTEGER NOT NULL
);
ALTER TABLE
    "UserHasCours" ADD PRIMARY KEY("id");
CREATE TABLE "CoursHasCategory"(
    "id" INTEGER NOT NULL,
    "coursId" INTEGER NOT NULL,
    "categoriesId" INTEGER NOT NULL
);
ALTER TABLE
    "CoursHasCategory" ADD PRIMARY KEY("id");

CREATE TABLE "Badge"(
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NULL
);
ALTER TABLE
    "Badge" ADD PRIMARY KEY("id");
ALTER TABLE
    "Badge" ADD CONSTRAINT "badge_title_unique" UNIQUE("title");

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
CREATE TABLE "Cours"(
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
    "Cours" ADD PRIMARY KEY("id");
ALTER TABLE
    "Cours" ADD CONSTRAINT "cours_title_unique" UNIQUE("title");
CREATE TABLE "Category"(
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
ALTER TABLE
    "Category" ADD PRIMARY KEY("id");
ALTER TABLE
    "Category" ADD CONSTRAINT "category_name_unique" UNIQUE("name");
CREATE TABLE "CoursContent"(
    "id" INTEGER NOT NULL,
    "coursId" INTEGER NOT NULL,
    "page" INTEGER NOT NULL,
    "content" TEXT NOT NULL
);
ALTER TABLE
    "CoursContent" ADD PRIMARY KEY("id");
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
    "coursId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL
);
ALTER TABLE
    "Opinion" ADD PRIMARY KEY("id");
CREATE TABLE "Comment"(
    "id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "typeCible" TEXT NOT NULL,
    "cibleId" INTEGER NOT NULL,
    "authiorId" INTEGER NOT NULL
);
ALTER TABLE
    "Comment" ADD PRIMARY KEY("id");
CREATE TABLE "Notification"(
    "id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "coursId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL
);
ALTER TABLE
    "Notification" ADD PRIMARY KEY("id");
CREATE TABLE "CourStarted"(
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "coursId" INTEGER NOT NULL,
    "isFinished" BOOLEAN NOT NULL
);
ALTER TABLE
    "CourStarted" ADD PRIMARY KEY("id");
CREATE TABLE "Tool"(
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
ALTER TABLE
    "Tool" ADD PRIMARY KEY("id");
ALTER TABLE
    "Tool" ADD CONSTRAINT "tool_name_unique" UNIQUE("name");
CREATE TABLE "LearningObjective"(
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
ALTER TABLE
    "LearningObjective" ADD PRIMARY KEY("id");
ALTER TABLE
    "LearningObjective" ADD CONSTRAINT "learningobjective_name_unique" UNIQUE("name");
CREATE TABLE "CoursHasTool"(
    "id" INTEGER NOT NULL,
    "coursId" INTEGER NOT NULL,
    "toolId" INTEGER NOT NULL
);
ALTER TABLE
    "CoursHasTool" ADD PRIMARY KEY("id");
CREATE TABLE "CoursHasLearningObjective"(
    "id" INTEGER NOT NULL,
    "coursId" INTEGER NOT NULL,
    "learningObjective" INTEGER NOT NULL
);
ALTER TABLE
    "CoursHasLearningObjective" ADD PRIMARY KEY("id");
ALTER TABLE
    "Cours" ADD CONSTRAINT "cours_id_foreign" FOREIGN KEY("id") REFERENCES "UserHasCours"("coursId");
ALTER TABLE
    "User" ADD CONSTRAINT "user_id_foreign" FOREIGN KEY("id") REFERENCES "Cours"("authorId");
ALTER TABLE
    "Cours" ADD CONSTRAINT "cours_id_foreign" FOREIGN KEY("id") REFERENCES "CoursHasTool"("toolId");
ALTER TABLE
    "User" ADD CONSTRAINT "user_id_foreign" FOREIGN KEY("id") REFERENCES "Notification"("userId");
ALTER TABLE
    "Cours" ADD CONSTRAINT "cours_id_foreign" FOREIGN KEY("id") REFERENCES "Notification"("coursId");
ALTER TABLE
    "LearningObjective" ADD CONSTRAINT "learningobjective_id_foreign" FOREIGN KEY("id") REFERENCES "CoursHasLearningObjective"("learningObjectivd");
ALTER TABLE
    "Cours" ADD CONSTRAINT "cours_id_foreign" FOREIGN KEY("id") REFERENCES "Opinion"("coursId");
ALTER TABLE
    "Cours" ADD CONSTRAINT "cours_id_foreign" FOREIGN KEY("id") REFERENCES "CoursContent"("coursId");
ALTER TABLE
    "Cours" ADD CONSTRAINT "cours_id_foreign" FOREIGN KEY("id") REFERENCES "CourStarted"("coursId");
ALTER TABLE
    "Role" ADD CONSTRAINT "role_id_foreign" FOREIGN KEY("id") REFERENCES "User"("roleId");
ALTER TABLE
    "User" ADD CONSTRAINT "user_id_foreign" FOREIGN KEY("id") REFERENCES "Comment"("authiorId");
ALTER TABLE
    "User" ADD CONSTRAINT "user_id_foreign" FOREIGN KEY("id") REFERENCES "Opinion"("userId");
ALTER TABLE
    "Category" ADD CONSTRAINT "category_id_foreign" FOREIGN KEY("id") REFERENCES "CoursHasCategory"("categoriesId");
ALTER TABLE
    "Cours" ADD CONSTRAINT "cours_id_foreign" FOREIGN KEY("id") REFERENCES "Comment"("cibleId");
ALTER TABLE
    "Cours" ADD CONSTRAINT "cours_id_foreign" FOREIGN KEY("id") REFERENCES "CoursHasCategory"("coursId");
ALTER TABLE
    "User" ADD CONSTRAINT "user_id_foreign" FOREIGN KEY("id") REFERENCES "CourStarted"("userId");
ALTER TABLE
    "User" ADD CONSTRAINT "user_id_foreign" FOREIGN KEY("id") REFERENCES "UserHasCours"("userId");
ALTER TABLE
    "Comment" ADD CONSTRAINT "comment_cibleid_foreign" FOREIGN KEY("cibleId") REFERENCES "Comment"("id");
ALTER TABLE
    "Cours" ADD CONSTRAINT "cours_id_foreign" FOREIGN KEY("id") REFERENCES "CoursHasLearningObjective"("coursId");
ALTER TABLE
    "Tool" ADD CONSTRAINT "tool_id_foreign" FOREIGN KEY("id") REFERENCES "CoursHasTool"("toolId");

ALTER TABLE
    "User" ADD CONSTRAINT "user_id_foreign" FOREIGN KEY("id") REFERENCES "UserHasBadge"("userId");

ALTER TABLE
    "Badge" ADD CONSTRAINT "badge_id_foreign" FOREIGN KEY("id") REFERENCES "UserHasBadge"("badgeId");
