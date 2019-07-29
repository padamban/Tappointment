import { Button } from '../button/button.schema';
import { ionColor } from '../../_schemas/all.schema';

export interface ToolbarButtons {
    slot?: 'primary' | 'secondary' | 'start';
    isVisible?: boolean;
    show?: boolean;
    isMenu?: boolean;
    buttons?: Button[];
    color?: ionColor;
    animate?: boolean;
}

export interface ToolbarElement {
    toShow?: string;
    content?: string[];
    show?: boolean;
    action?: (e: any) => void;
}

export interface ToolbarContent {
    centered?: boolean;
    title?: ToolbarElement;
    logo?: ToolbarElement;
    searchbar?: ToolbarElement;
    buttons?: ToolbarButtons[];
}


