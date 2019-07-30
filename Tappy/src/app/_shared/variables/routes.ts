
const ROOT_PATH = {
    AUTH: 'auth',
    MENU: 'menu',
    ACCOUNT: 'account',
    CART: 'cart',
    DRINK: 'drinks',
    FOOD: 'foods'
};

const ACTION_PATH = {
    INIT: ROOT_PATH.AUTH,
    AFTER_LOGIN: ROOT_PATH.MENU,
    AFTER_LOGOUT: ROOT_PATH.AUTH,
    FULL_DRINK: `/${ROOT_PATH.MENU}/${ROOT_PATH.DRINK}`,
    FULL_FOOD: `/${ROOT_PATH.MENU}/${ROOT_PATH.FOOD}`

};

export abstract class PM {
    public static R = ROOT_PATH;
    public static A = ACTION_PATH;

    public static nav(root: string) {
        return '/' + root;
    }
}
