/*
  Warnings:

  - A unique constraint covering the columns `[credentials_id]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Categories" ALTER COLUMN "flag" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Credentials" ALTER COLUMN "flag" SET DEFAULT true;

-- AlterTable
ALTER TABLE "GeneralLocations" ALTER COLUMN "flag" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Object" ALTER COLUMN "flag" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Roles" ALTER COLUMN "flag" SET DEFAULT true;

-- AlterTable
ALTER TABLE "SpecificLocations" ALTER COLUMN "flag" SET DEFAULT true;

-- AlterTable
ALTER TABLE "States" ALTER COLUMN "flag" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "flag" SET DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "Users_credentials_id_key" ON "Users"("credentials_id");
