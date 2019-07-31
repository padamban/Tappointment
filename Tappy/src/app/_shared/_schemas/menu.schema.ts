import { Db } from './all.schema';


export enum MenuItemCategory {
    Starter = 0,
    Soup,
    MainDish,
    Pizza,
    Dessert,
    Drink,
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
    cart: number;
    db: MenuItemDb;
}


export interface CartContentDb extends Db {
    content: Map<string, number>;
}

export interface CartContent {
    db: CartContentDb;
}


