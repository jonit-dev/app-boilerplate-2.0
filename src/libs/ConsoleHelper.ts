import { ConsoleColor } from '../types/console.types';



export class ConsoleHelper {
  public static coloredLog(backgroundColor: ConsoleColor, textColor: ConsoleColor, text: string, textOnly = false): string | void {

    const textString = (`${backgroundColor}${textColor}${text}${ConsoleColor.Reset}`)
    if (textOnly) {
      return textString
    }

    return console.log(textString)

  }
}
