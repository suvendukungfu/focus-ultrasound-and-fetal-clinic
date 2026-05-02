-- AlterTable
ALTER TABLE "appointments" RENAME COLUMN "patientEmail" TO "email";
ALTER TABLE "appointments" RENAME COLUMN "patientName" TO "name";
ALTER TABLE "appointments" RENAME COLUMN "patientPhone" TO "phone";

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "externalId" TEXT,
ADD COLUMN     "source" TEXT NOT NULL DEFAULT 'manual';

-- CreateIndex
CREATE UNIQUE INDEX "reviews_externalId_key" ON "reviews"("externalId");
