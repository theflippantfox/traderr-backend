-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticker" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" REAL NOT NULL,
    "trade" TEXT NOT NULL,
    "leverage" INTEGER NOT NULL,
    "entry" REAL NOT NULL,
    "exit" REAL,
    "pnl" REAL NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Trade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Trade" ("datetime", "entry", "exit", "id", "leverage", "pnl", "size", "ticker", "trade", "type", "userId") SELECT "datetime", "entry", "exit", "id", "leverage", coalesce("pnl", 0) AS "pnl", "size", "ticker", "trade", "type", "userId" FROM "Trade";
DROP TABLE "Trade";
ALTER TABLE "new_Trade" RENAME TO "Trade";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
