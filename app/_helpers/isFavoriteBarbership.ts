import { UserFavoriteBarbershop } from "@prisma/client";

export const isFavoriteBarbershop = (barbershopFavorites: UserFavoriteBarbershop[], userId: string) => {
    const isFavoriteFilter = barbershopFavorites.filter(favorites => favorites.userId === (userId)).length !== 0 ? true : false

    return isFavoriteFilter
}