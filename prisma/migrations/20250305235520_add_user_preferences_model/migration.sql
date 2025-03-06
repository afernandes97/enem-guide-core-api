-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "academyAvarege" INTEGER NOT NULL,
    "selectedLanguage" TEXT NOT NULL,
    "schoolYear" INTEGER NOT NULL,
    "Objective" TEXT NOT NULL,
    "studyHoursPerDay" INTEGER NOT NULL,
    "favoriteSubject" TEXT NOT NULL,
    "difficultMaterial" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");
