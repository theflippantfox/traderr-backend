-- CreateTable
CREATE TABLE "Trade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticker" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" REAL NOT NULL,
    "trade" TEXT NOT NULL,
    "leverage" INTEGER NOT NULL,
    "entry" REAL NOT NULL,
    "exit" REAL,
    "pnl" REAL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Trade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Notes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT NOT NULL,
    "tradeId" TEXT NOT NULL,
    CONSTRAINT "Notes_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePic" TEXT NOT NULL,
    "balance" REAL NOT NULL DEFAULT 0,
    "totalPnL" REAL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
