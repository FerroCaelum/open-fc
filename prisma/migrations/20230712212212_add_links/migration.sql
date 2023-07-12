-- CreateTable
CREATE TABLE "GameEntityLink" (
    "id" UUID NOT NULL,
    "fromId" UUID NOT NULL,
    "toId" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameEntityLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameEntityLink" ADD CONSTRAINT "GameEntityLink_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "GameEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameEntityLink" ADD CONSTRAINT "GameEntityLink_toId_fkey" FOREIGN KEY ("toId") REFERENCES "GameEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
