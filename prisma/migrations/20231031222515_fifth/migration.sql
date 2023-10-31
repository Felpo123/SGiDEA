/*
  Warnings:

  - You are about to drop the column `general_location_id` on the `Objects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[type]` on the table `Roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `States` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Objects" DROP CONSTRAINT "Objects_general_location_id_fkey";

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
ALTER TABLE "Objects" DROP COLUMN "general_location_id",
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Roles" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "SpecificLocations" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "States" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_type_key" ON "Roles"("type");

-- CreateIndex
CREATE UNIQUE INDEX "States_name_key" ON "States"("name");
