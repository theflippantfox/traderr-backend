-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT,
    "password" TEXT NOT NULL,
    "profilePic" TEXT NOT NULL,
    "balance" REAL NOT NULL DEFAULT 0,
    "totalPnL" REAL DEFAULT 0
);
INSERT INTO "new_User" ("balance", "email", "fullName", "id", "password", "profilePic", "totalPnL", "username") SELECT "balance", "email", "fullName", "id", "password", "profilePic", "totalPnL", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
