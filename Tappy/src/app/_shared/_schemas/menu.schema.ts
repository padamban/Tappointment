

export enum MenuItemCategory {
    Starter = 0,
    Soup,
    MainDish,
    Pizza,
    Dessert,
    Drink,
}

export interface Db {
    id?: string;
}

export interface MenuItemDb extends Db {
    category?: MenuItemCategory;
    description?: string;
    name?: string;
    price?: number;
    isSpicy?: boolean;
    isVegetarian?: boolean;
}

export interface MenuItem {
    db?: MenuItemDb;
}





