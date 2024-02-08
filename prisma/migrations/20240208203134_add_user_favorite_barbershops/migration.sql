-- CreateTable
CREATE TABLE "UserFavoriteBarbershop" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "barbershopId" TEXT NOT NULL,

    CONSTRAINT "UserFavoriteBarbershop_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserFavoriteBarbershop" ADD CONSTRAINT "UserFavoriteBarbershop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteBarbershop" ADD CONSTRAINT "UserFavoriteBarbershop_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "Barbershop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
