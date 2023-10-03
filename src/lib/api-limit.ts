import { auth } from "@clerk/nextjs"

import prismadb from "@/lib/prismadb"
import { MAX_FREE_COUNTS } from "@/constants"

export const increaseApiLimit = async () => {
    const { userId } = auth();

    if (!userId) {
        return;
    }
    // Find userApiLimit by userId
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });


    // If userApiLimit is found, update the count
    if (userApiLimit) {
        await prismadb.userApiLimit.update({
            where: {
                userId: userId
            },
            data: {
                count: userApiLimit.count + 1
            }
        });
        // If userApiLimit is found, create the count
    } else {
        await prismadb.userApiLimit.create({
            data: {
                userId,
                count: 1
            }
        });
    }
}
export const checkApiLimit = async () => {
    const { userId } = auth();

    if (!userId) {
        return;
    }
    // Find userApiLimit by userId
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    // If userApiLimit is not found, return true (free) else check the count and return true (free) if count is less than MAX_FREE_COUNTS
    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
        return true;
    } else {
        return false;
    }
};

