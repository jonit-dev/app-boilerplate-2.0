import { Entities } from '@little-sentinel/shared';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

interface IInterpolationObjs {
  [key: string]: string;
}

@Injectable()
export class TranslationHelper {
  get(
    entity: Entities,
    key: string,
    interpolationObjs?: IInterpolationObjs,
  ): any {
    const translationsPath = path.resolve(
      __dirname,
      '../../node_modules/@little-sentinel/shared/src/translations',
    );

    const envLang = process.env.LANGUAGE;

    const translationFilePath = `${translationsPath}/${entity}.lang.json`;

    const jsonFile = fs.readFileSync(translationFilePath);

    const languageObj = JSON.parse(jsonFile.toString());

    let translatedString: string = languageObj[key][envLang];

    if (interpolationObjs) {
      for (const key of Object.keys(interpolationObjs)) {
        translatedString = translatedString.replace(
          `{{${key}}}`,
          interpolationObjs[key],
        );
      }
    }

    return translatedString;
  }
}
