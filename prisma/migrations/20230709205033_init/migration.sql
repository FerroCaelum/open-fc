-- CreateTable
CREATE TABLE "Note" (
    "id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "lastUpdate" TIMESTAMP(3) NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);
