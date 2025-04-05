-- CreateTable
CREATE TABLE "Container" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "containerName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "repoLink" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "entrypoint" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Container_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
