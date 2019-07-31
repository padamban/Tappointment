import { AccessZone } from './all.schema';
import { Button } from '../components/button/button.schema';


export interface DrawerButton {
    zone: AccessZone;
    button: Button;
    line?: string;
    show?: boolean;
    color?: string;
    isWiredToCart?: boolean;
    id?: string;
}


export interface DrawerContent {
    size?: 'small' | 'large';
    buttons: DrawerButton[];
}
