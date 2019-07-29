import { NgFormSelectorWarning } from '@angular/forms';
import { PropertyComponentType } from '../../_schemas/all.schema';



export interface FormSilder {
    thumbLabel: boolean;
    min: number;
    max: number;
    step: number;
    value: number;
}

export interface FormRadioButton {
    value: number;
    label: string;
}

// export form

export interface FormRadioGroup {
    selected: number;
    vertical: boolean;
    buttons: FormRadioButton[];
}

export interface FormSelectOption {
    value: any;
    label: string;
}

export interface FormSelect {
    options: FormSelectOption[];
}


export interface FormInput {
    id?: string;
    id2?: string;
    label?: string;
    translateParam?: any;
    placeholder?: string;
    hint?: string;
    hint2?: string;
    hintSlot?: string;
    type?: string;
    required?: boolean;
    component?: PropertyComponentType;
    validators?: any[];
    validators2?: any[];
    messages?: any[];
    messages2?: any[];
    preFill?: any;
    slider?: FormSilder;
    radio?: FormRadioGroup;
    select?: FormSelect;
    repeat?: number | string[];
    responsiveRepeat?: boolean;
    mainLabel?: string;
    imgBlob?: string;
    default?: any;
    hasSelectNone?: boolean;
    autocomplete?: boolean;

}

export interface FormSubmit {
    hide?: boolean;
    label: string;
    action: (e: any, onSuccess: (v) => void, onError: (v) => void) => void;
    successMsg: string;
    errorMsg: string;
    slot?: 'top' | 'bottom';
}

export enum FormState {
    VALID = 1,
    INVALID = 2
}

export interface FormChangeEventData {
    formId?: string;
    state: FormState;
    data: any;
    changed: any;
}

export interface FormReset {
    clear: string[];
    reset: boolean;
}

export interface FormFrame {
    id?: string;
    inputs: FormInput[];
    submit: FormSubmit;
    resetOnSubmit: FormReset;
}




