-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('ANIME', 'MANGA', 'MOVIE', 'TELEVISION', 'ANIMATION', 'COMIC', 'GAME', 'LIGHT_NOVEL', 'NOVEL', 'WEB_SERIES', 'OVA', 'ONA', 'SPECIAL', 'OTHER');

-- CreateEnum
CREATE TYPE "MediaStatus" AS ENUM ('ONGOING', 'COMPLETED', 'CANCELLED', 'HIATUS', 'ANNOUNCED', 'UPCOMING');

-- CreateEnum
CREATE TYPE "ImportJobStatus" AS ENUM ('PENDING', 'RUNNING', 'PAUSED', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Franchise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Franchise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Universe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Universe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalSource" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "apiDocsUrl" TEXT,
    "logoUrl" TEXT,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExternalSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaTitle" (
    "id" SERIAL NOT NULL,
    "canonicalTitle" TEXT NOT NULL,
    "originalTitle" TEXT,
    "alternativeTitles" JSONB NOT NULL DEFAULT '[]',
    "slug" TEXT NOT NULL,
    "mediaType" "MediaType" NOT NULL,
    "subType" TEXT,
    "status" "MediaStatus" NOT NULL DEFAULT 'COMPLETED',
    "franchiseId" INTEGER,
    "universeId" INTEGER,
    "externalSourceId" INTEGER,
    "genres" JSONB NOT NULL DEFAULT '[]',
    "releaseYear" INTEGER,
    "releaseDate" TIMESTAMP(3),
    "endYear" INTEGER,
    "country" TEXT,
    "language" TEXT,
    "themes" JSONB NOT NULL DEFAULT '[]',
    "description" TEXT,
    "episodeCount" INTEGER,
    "volumeCount" INTEGER,
    "chapterCount" INTEGER,
    "duration" INTEGER,
    "imageUrl" TEXT,
    "bannerUrl" TEXT,
    "sourceUrl" TEXT,
    "sourceName" TEXT,
    "externalId" TEXT,
    "adultContent" BOOLEAN NOT NULL DEFAULT false,
    "isDemoData" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "popularity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaTitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpinHistory" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT,
    "mediaTitleId" INTEGER NOT NULL,
    "filterHash" TEXT,
    "wheelConfig" JSONB,
    "spunAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpinHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCollection" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "filterConfig" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExcludedTitle" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT,
    "userId" TEXT,
    "mediaTitleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExcludedTitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomTitle" (
    "id" SERIAL NOT NULL,
    "mediaTitleId" INTEGER NOT NULL,
    "submittedBy" TEXT,
    "reviewStatus" TEXT NOT NULL DEFAULT 'pending',
    "reviewedBy" TEXT,
    "reviewNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomTitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportJob" (
    "id" SERIAL NOT NULL,
    "externalSourceId" INTEGER NOT NULL,
    "status" "ImportJobStatus" NOT NULL DEFAULT 'PENDING',
    "params" JSONB NOT NULL,
    "totalRecords" INTEGER NOT NULL DEFAULT 0,
    "processedRecords" INTEGER NOT NULL DEFAULT 0,
    "insertedRecords" INTEGER NOT NULL DEFAULT 0,
    "skippedRecords" INTEGER NOT NULL DEFAULT 0,
    "errorLog" JSONB NOT NULL DEFAULT '[]',
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,

    CONSTRAINT "ImportJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilterCountCache" (
    "id" SERIAL NOT NULL,
    "filterHash" TEXT NOT NULL,
    "filterState" JSONB NOT NULL,
    "totalCount" INTEGER NOT NULL,
    "computedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FilterCountCache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "_MediaTitleToUserCollection" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_slug_key" ON "Genre"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Franchise_name_key" ON "Franchise"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Franchise_slug_key" ON "Franchise"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Universe_name_key" ON "Universe"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Universe_slug_key" ON "Universe"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ExternalSource_name_key" ON "ExternalSource"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MediaTitle_slug_key" ON "MediaTitle"("slug");

-- CreateIndex
CREATE INDEX "MediaTitle_mediaType_idx" ON "MediaTitle"("mediaType");

-- CreateIndex
CREATE INDEX "MediaTitle_slug_idx" ON "MediaTitle"("slug");

-- CreateIndex
CREATE INDEX "MediaTitle_releaseYear_idx" ON "MediaTitle"("releaseYear");

-- CreateIndex
CREATE INDEX "MediaTitle_popularity_idx" ON "MediaTitle"("popularity");

-- CreateIndex
CREATE INDEX "MediaTitle_isDemoData_idx" ON "MediaTitle"("isDemoData");

-- CreateIndex
CREATE INDEX "MediaTitle_adultContent_idx" ON "MediaTitle"("adultContent");

-- CreateIndex
CREATE INDEX "MediaTitle_franchiseId_idx" ON "MediaTitle"("franchiseId");

-- CreateIndex
CREATE INDEX "MediaTitle_universeId_idx" ON "MediaTitle"("universeId");

-- CreateIndex
CREATE INDEX "MediaTitle_isHidden_idx" ON "MediaTitle"("isHidden");

-- CreateIndex
CREATE INDEX "SpinHistory_sessionId_idx" ON "SpinHistory"("sessionId");

-- CreateIndex
CREATE INDEX "SpinHistory_userId_idx" ON "SpinHistory"("userId");

-- CreateIndex
CREATE INDEX "SpinHistory_spunAt_idx" ON "SpinHistory"("spunAt");

-- CreateIndex
CREATE UNIQUE INDEX "ExcludedTitle_sessionId_mediaTitleId_key" ON "ExcludedTitle"("sessionId", "mediaTitleId");

-- CreateIndex
CREATE UNIQUE INDEX "ExcludedTitle_userId_mediaTitleId_key" ON "ExcludedTitle"("userId", "mediaTitleId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomTitle_mediaTitleId_key" ON "CustomTitle"("mediaTitleId");

-- CreateIndex
CREATE INDEX "ImportJob_status_idx" ON "ImportJob"("status");

-- CreateIndex
CREATE UNIQUE INDEX "FilterCountCache_filterHash_key" ON "FilterCountCache"("filterHash");

-- CreateIndex
CREATE INDEX "FilterCountCache_expiresAt_idx" ON "FilterCountCache"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "_MediaTitleToUserCollection_AB_unique" ON "_MediaTitleToUserCollection"("A", "B");

-- CreateIndex
CREATE INDEX "_MediaTitleToUserCollection_B_index" ON "_MediaTitleToUserCollection"("B");

-- AddForeignKey
ALTER TABLE "MediaTitle" ADD CONSTRAINT "MediaTitle_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaTitle" ADD CONSTRAINT "MediaTitle_universeId_fkey" FOREIGN KEY ("universeId") REFERENCES "Universe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaTitle" ADD CONSTRAINT "MediaTitle_externalSourceId_fkey" FOREIGN KEY ("externalSourceId") REFERENCES "ExternalSource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpinHistory" ADD CONSTRAINT "SpinHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpinHistory" ADD CONSTRAINT "SpinHistory_mediaTitleId_fkey" FOREIGN KEY ("mediaTitleId") REFERENCES "MediaTitle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCollection" ADD CONSTRAINT "UserCollection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExcludedTitle" ADD CONSTRAINT "ExcludedTitle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExcludedTitle" ADD CONSTRAINT "ExcludedTitle_mediaTitleId_fkey" FOREIGN KEY ("mediaTitleId") REFERENCES "MediaTitle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomTitle" ADD CONSTRAINT "CustomTitle_mediaTitleId_fkey" FOREIGN KEY ("mediaTitleId") REFERENCES "MediaTitle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomTitle" ADD CONSTRAINT "CustomTitle_submittedBy_fkey" FOREIGN KEY ("submittedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportJob" ADD CONSTRAINT "ImportJob_externalSourceId_fkey" FOREIGN KEY ("externalSourceId") REFERENCES "ExternalSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaTitleToUserCollection" ADD CONSTRAINT "_MediaTitleToUserCollection_A_fkey" FOREIGN KEY ("A") REFERENCES "MediaTitle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaTitleToUserCollection" ADD CONSTRAINT "_MediaTitleToUserCollection_B_fkey" FOREIGN KEY ("B") REFERENCES "UserCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
