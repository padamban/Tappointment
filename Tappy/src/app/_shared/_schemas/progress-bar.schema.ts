import { ionColor } from './all.schema';
import { Utility } from '../util/utility';

export interface ProgressBarContent {
    value?: number;
    reversed?: boolean;
    color?: ionColor;
    type?: 'indeterminate' | 'determinate';
    buffer?: number;
    hidden?: boolean;
}


export const NO_PROGRESS: ProgressBarContent = {
    color: null,
    type: null,
    reversed: null,
    value: null,
    buffer: null,
    hidden: null
};

export class ProgressBarManager {

    public progress: ProgressBarContent = { ...NO_PROGRESS };

    setProgressContent(progress: ProgressBarContent) {
        if (Utility._canUse(progress)) {
            Object.assign(this.progress, progress);
        } else {
            Object.assign(this.progress, { ...NO_PROGRESS });
        }
    }



    end( delay = 1000, cb = () => {} ) {
        setTimeout(() => {
            const d = { ...NO_PROGRESS };
            d.hidden = true;
            Object.assign(this.progress, d);
            cb();
            setTimeout(() => {
                this.progress.hidden = null;
            }, 300);
        }, delay);
    }

}

