import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

interface IInterpolationObj {
  [key: string]: string;
}

@Injectable()
export class TSHelper {
  get(
    resource: string,
    key: string,
    interpolationObj?: IInterpolationObj,
  ): any {
    const translationsPath = path.resolve(__dirname, '../../translations');

    const envLang = process.env.LANGUAGE;

    const translationFilePath = `${translationsPath}/${resource}.lang.json`;

    const jsonFile = fs.readFileSync(translationFilePath);

    const languageObj = JSON.parse(jsonFile.toString());

    let translatedString: string = languageObj[key][envLang];

    if (interpolationObj) {
      for (const key of Object.keys(interpolationObj)) {
        translatedString = translatedString.replace(
          `{{${key}}}`,
          interpolationObj[key],
        );
      }
    }

    return translatedString;
  }
}
