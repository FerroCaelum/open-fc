/*
  Warnings:

  - You are about to drop the column `title` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the `GameEntity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameEntityLink` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Note` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GameEntityLink" DROP CONSTRAINT "GameEntityLink_fromId_fkey";

-- DropForeignKey
ALTER TABLE "GameEntityLink" DROP CONSTRAINT "GameEntityLink_toId_fkey";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "GameEntity";

-- DropTable
DROP TABLE "GameEntityLink";

-- CreateTable
CREATE TABLE "NoteLink" (
    "id" UUID NOT NULL,
    "fromId" UUID NOT NULL,
    "toId" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NoteLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Note_name_key" ON "Note"("name");

-- AddForeignKey
ALTER TABLE "NoteLink" ADD CONSTRAINT "NoteLink_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteLink" ADD CONSTRAINT "NoteLink_toId_fkey" FOREIGN KEY ("toId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
