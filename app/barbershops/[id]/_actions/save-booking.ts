"use server"

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

interface SaveBookingsParams {
    barbershopId: string;
    serviceId: string;
    userId: string;
    date: Date;
}

export const SaveBooking = async ({barbershopId, date, serviceId, userId}: SaveBookingsParams) => {
    await db.booking.create({
        data: {
            serviceId: serviceId,
            userId: userId,
            date: date,
            barbershopId: barbershopId
        }
    })

    revalidatePath('/bookings')
    revalidatePath('/')
}