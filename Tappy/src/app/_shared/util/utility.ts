import { map } from 'rxjs/operators';
import { fromEvent, Observable } from 'rxjs';

export class Utility {

    static _getEnumNames(e: any): string[] {
        return Object.values(e).filter(value => typeof value === 'string') as string[];
    }

    static _getEnumName(v: number, e: any) {
        return Utility._getEnumNames(e)[v] as string;
    }

    public static _canUse(v: any): boolean {
        return !(v === null || v === undefined || v === '');
    }

    public static _assignOnlyExisting(target: object, source: object) {
        const targetKeys = Object.keys(target);
        const sourceKeys = Object.keys(source);
        const tempTarget = {};

        for (const skey of sourceKeys) {
            if (targetKeys.indexOf(skey) != -1) {
                target[skey] = source[skey];
            }
        }
        return target;
    }

    public static readFile(file: File | Blob): Observable<any> {
        const reader = new FileReader();
        const loadend = fromEvent(reader, 'loadend').pipe(
            map((read: any) => {
                return read.target.result;
            })
        );
        reader.readAsDataURL(file);
        return loadend;
    }

    public static _createEnumOptions(enm: any) {
        return Utility._getEnumNames(enm).map(a => {
            return {
                value: enm[a],
                text: a
            };
        });
    }

    public static _createEnumOptions2(enm: any) {
        return Utility._getEnumNames(enm).map(a => {
            return {
                value: enm[a],
                label: a
            };
        });
    }


    public static _textMatch(text: string, filter: string) {
        const t = text.toLowerCase();
        const f = filter.toLowerCase();
        const isMatch = t.indexOf(f) > -1;
        return isMatch;
    }

}
