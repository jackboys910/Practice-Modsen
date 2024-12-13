-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "uri" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBookRating" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookUri" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "UserBookRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookAverageRating" (
    "id" SERIAL NOT NULL,
    "bookUri" TEXT NOT NULL,
    "average" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BookAverageRating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_uri_key" ON "Book"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "UserBookRating_userId_bookUri_key" ON "UserBookRating"("userId", "bookUri");

-- CreateIndex
CREATE UNIQUE INDEX "BookAverageRating_bookUri_key" ON "BookAverageRating"("bookUri");

-- AddForeignKey
ALTER TABLE "UserBookRating" ADD CONSTRAINT "UserBookRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBookRating" ADD CONSTRAINT "UserBookRating_bookUri_fkey" FOREIGN KEY ("bookUri") REFERENCES "Book"("uri") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookAverageRating" ADD CONSTRAINT "BookAverageRating_bookUri_fkey" FOREIGN KEY ("bookUri") REFERENCES "Book"("uri") ON DELETE RESTRICT ON UPDATE CASCADE;
