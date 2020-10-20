import { Injectable } from '@nestjs/common';

import { ConsoleColor } from '../types/console.types';

@Injectable()
export class ConsoleHelper {
  public coloredLog(
    backgroundColor: ConsoleColor,
    textColor: ConsoleColor,
    text: string,
    textOnly = false,
  ): string | void {
    const textString = `${backgroundColor}${textColor}${text}${ConsoleColor.Reset}`;
    if (textOnly) {
      return textString;
    }

    return console.log(textString);
  }
}
