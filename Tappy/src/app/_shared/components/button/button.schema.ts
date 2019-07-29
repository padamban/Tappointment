import { ionColor, AccessZone } from '../../_schemas/all.schema';

export interface Button {
    route?: string[];
    iconType?: 'src'|'name'|'text';
    active?: boolean;
    icon?: string;
    value?: any;
    name?: string;
    platform?: 'ios'| 'md';
    mode?: 'icon-only';
    color?: ionColor;
    size?: 'small' | 'large';
    fill?: 'clear' | 'outline' | 'solid';
    darkmodeSensitive?: boolean;
    variable?: boolean;
    disabled?: boolean;
    show?: boolean;
    showForced?: boolean;
    action?: (event?: any, source?: any,  onSuccess?: (v) => void, onError?: (v) => void) => void;
    zone?: AccessZone;
    badge?: number;
}
