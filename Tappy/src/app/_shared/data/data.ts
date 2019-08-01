import { MenuItem, MenuItemDb, MenuItemCategory } from '../_schemas/menu.schema';

export const DATA: MenuItemDb[] = [
    {
        id: '1',
        name: 'Cézár saláta',
        description: 'Saláta csirkemellel, uborkával, pirított kenyérkockával',
        category: MenuItemCategory.Starter,
        price: 700,
        isSpicy: false,
        isVegetarian: false
    },
    {
        id: '2',
        name: 'Coleslaw',
        description: 'Amerikai káposztasaláta',
        category: MenuItemCategory.Starter,
        price: 500,
        isSpicy: false,
        isVegetarian: false
    },
    {
        id: '3',
        name: 'Tócsni',
        description: 'Tökmag pestoval',
        category: MenuItemCategory.Starter,
        price: 750,
        isSpicy: false,
        isVegetarian: true
    },
    {
        id: '4',
        name: 'Húsleves',
        description: 'Csigatésztával vagy májgaluskával',
        category: MenuItemCategory.Soup,
        price: 800,
        isSpicy: false,
        isVegetarian: false
    },
    {
        id: '5',
        name: 'Bableves',
        description: 'Tejfölös csülkös',
        category: MenuItemCategory.Soup,
        price: 1000,
        isSpicy: false,
        isVegetarian: false
    },
    {
        id: '6',
        name: 'Gyümölcsleves',
        description: 'Tejszínhabbal, erdei gyümölcsökkel',
        category: MenuItemCategory.Soup,
        price: 1000,
        isSpicy: false,
        isVegetarian: true
    },
    {
        id: '7',
        name: 'Halászlé',
        description: 'Pontyból, harcsából és busából',
        category: MenuItemCategory.Soup,
        price: 1500,
        isSpicy: true,
        isVegetarian: false
    },
    {
        id: '8',
        name: 'Pacalpörkölt',
        description: 'Törtburgonyával',
        category: MenuItemCategory.MainDish,
        price: 1200,
        isSpicy: false,
        isVegetarian: true
    },
    {
        id: '9',
        name: 'Pacalpörkölt',
        description: 'Törtburgonyával',
        category: MenuItemCategory.MainDish,
        price: 1200,
        isSpicy: false,
        isVegetarian: false
    },
    {
        id: '10',
        name: 'Bécsi szelet',
        description: '',
        category: MenuItemCategory.MainDish,
        price: 2500,
        isSpicy: false,
        isVegetarian: false
    },
    {
        id: '11',
        name: 'Rántott cukkini',
        description: 'Rizzsel, vagy hasábburgonyával',
        category: MenuItemCategory.MainDish,
        price: 1500,
        isSpicy: false,
        isVegetarian: true
    },
    {
        id: '12',
        name: 'Marhapörkölt',
        description: 'Galuskával',
        category: MenuItemCategory.MainDish,
        price: 2500,
        isSpicy: false,
        isVegetarian: true
    },
    {
        id: '13',
        name: 'Pizza Margherita',
        description: 'Paradicsomszósz, bazsalikom',
        category: MenuItemCategory.Pizza,
        price: 1000,
        isSpicy: false,
        isVegetarian: true
    },
    {
        id: '14',
        name: 'Pizza Tonno',
        description: 'Paradicsomszósz, bazsalikom',
        category: MenuItemCategory.Pizza,
        price: 1500,
        isSpicy: false,
        isVegetarian: false
    },
    {
        id: '15',
        name: 'Pizza Quattro Formaggi',
        description: 'Négyféle sajttal',
        category: MenuItemCategory.Pizza,
        price: 2000,
        isSpicy: false,
        isVegetarian: true
    },
    {
        id: '16',
        name: 'Húsimádó Pizza',
        description: 'Sonkával, pikáns szalámival, füstölt kolbásszal',
        category: MenuItemCategory.Pizza,
        price: 2000,
        isSpicy: true,
        isVegetarian: false
    },
    {
        id: '17',
        name: 'Somlói galuska',
        description: '',
        category: MenuItemCategory.Dessert,
        price: 2000,
        isSpicy: false,
        isVegetarian: false
    },
    {
        id: '18',
        name: 'Coca-Cola',
        description: null,
        category: MenuItemCategory.Drink,
        price: 300,
        isSpicy: null,
        isVegetarian: null
    },
    {
        id: '19',
        name: 'Ásványvíz',
        description: null,
        category: MenuItemCategory.Drink,
        price: 300,
        isSpicy: null,
        isVegetarian: null
    },
    {
        id: '20',
        name: 'Házi limonádé',
        description: null,
        category: MenuItemCategory.Drink,
        price: 650,
        isSpicy: null,
        isVegetarian: null
    },
    {
        id: '21',
        name: 'Red Bull',
        description: null,
        category: MenuItemCategory.Drink,
        price: 700,
        isSpicy: null,
        isVegetarian: null
    }

];
