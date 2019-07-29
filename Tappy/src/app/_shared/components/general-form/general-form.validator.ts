import { FormControl } from '@angular/forms';

export class GeneralFormValidators {

  static requiredFileType(types: string[]) {
    return (control: FormControl) => {
      const file = control.value;
      let passedAll = true;
      types.forEach(type => {
        let passed = false;
        if (file && file.files && file.files[0] && file.files[0].name) {
          const fileName = file.files[0].name;
          const extension = fileName.split('.')[1].toLowerCase();
          if (type.toLowerCase() !== extension.toLowerCase()) {
            passed = true;
          }
        }
        passedAll = passedAll ? passed : passedAll;
      });
      return passedAll ? { requiredFileType: true } : null;
    };
  }

}
