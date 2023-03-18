-- CreateTable
CREATE TABLE "CloundinaryIds" (
    "walletAddress" TEXT NOT NULL,
    "id" TEXT NOT NULL,

    CONSTRAINT "CloundinaryIds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "urls" TEXT[],
    "description" TEXT NOT NULL,
    "minted" BOOLEAN[] DEFAULT ARRAY[false, false]::BOOLEAN[],
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorWalletAddress" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metadata" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "walletAddress" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("walletAddress")
);

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_creatorWalletAddress_fkey" FOREIGN KEY ("creatorWalletAddress") REFERENCES "User"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;
