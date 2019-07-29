
const ROOT_PATH = {
    AUTH: 'auth',
    MENU: 'menu',
    ACCOUNT: 'account',
    CART: 'cart'
};

const ACTION_PATH = {
    INIT: ROOT_PATH.AUTH,
    AFTER_LOGIN: ROOT_PATH.MENU,
    AFTER_LOGOUT: ROOT_PATH.AUTH
};

export abstract class PM {
    public static R = ROOT_PATH;
    public static A = ACTION_PATH;

    public static nav(root: string) {
        return '/' + root;
    }
}
