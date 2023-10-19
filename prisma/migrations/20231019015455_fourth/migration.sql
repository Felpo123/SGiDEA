/*
  Warnings:

  - You are about to drop the `Object` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Credentials` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Assignments" DROP CONSTRAINT "Assignments_object_sku_fkey";

-- DropForeignKey
ALTER TABLE "Object" DROP CONSTRAINT "Object_categories_id_fkey";

-- DropForeignKey
ALTER TABLE "Object" DROP CONSTRAINT "Object_general_location_id_fkey";

-- DropForeignKey
ALTER TABLE "Object" DROP CONSTRAINT "Object_specific_location_id_fkey";

-- DropForeignKey
ALTER TABLE "Object" DROP CONSTRAINT "Object_states_id_fkey";

-- AlterTable
ALTER TABLE "Assignments" ALTER COLUMN "initial_date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Categories" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Credentials" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "GeneralLocations" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Roles" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "SpecificLocations" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "States" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Object";

-- CreateTable
CREATE TABLE "Objects" (
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "flag" BOOLEAN NOT NULL DEFAULT true,
    "states_id" INTEGER NOT NULL,
    "categories_id" INTEGER NOT NULL,
    "general_location_id" INTEGER NOT NULL,
    "specific_location_id" INTEGER NOT NULL,

    CONSTRAINT "Objects_pkey" PRIMARY KEY ("sku")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_email_key" ON "Credentials"("email");

-- AddForeignKey
ALTER TABLE "Objects" ADD CONSTRAINT "Objects_states_id_fkey" FOREIGN KEY ("states_id") REFERENCES "States"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Objects" ADD CONSTRAINT "Objects_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Objects" ADD CONSTRAINT "Objects_general_location_id_fkey" FOREIGN KEY ("general_location_id") REFERENCES "GeneralLocations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Objects" ADD CONSTRAINT "Objects_specific_location_id_fkey" FOREIGN KEY ("specific_location_id") REFERENCES "SpecificLocations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "Assignments_object_sku_fkey" FOREIGN KEY ("object_sku") REFERENCES "Objects"("sku") ON DELETE RESTRICT ON UPDATE CASCADE;
