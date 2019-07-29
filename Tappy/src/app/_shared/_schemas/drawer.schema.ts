import { AccessZone } from './all.schema';
import { Button } from '../components/button/button.schema';


export interface DrawerButton {
    zone: AccessZone;
    button: Button;
    line?: string;
    show?: boolean;
    color?: string;
    id?: string;
}


export interface DrawerContent {
    size?: 'small' | 'large';
    buttons: DrawerButton[];
}
