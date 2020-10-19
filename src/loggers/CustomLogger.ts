import { Logger } from '@nestjs/common';

import { ConsoleHelper } from '../libs/ConsoleHelper';
import { ConsoleColor } from '../types/console.types';


export enum ColorTemplate {
  Yellow,
  Red,
  Blue
}

interface IColorTemplate {
  [color: string]: {
    background: ConsoleColor,
    foreground: ConsoleColor
  }
}

export class CustomLogger extends Logger {

  public colorTemplate: IColorTemplate

  constructor(context: string) {
    super(context)

    this.colorTemplate = {
      [ColorTemplate.Yellow]: {
        background: ConsoleColor.BgYellow,
        foreground: ConsoleColor.FgBlack
      },
      [ColorTemplate.Red]: {
        background: ConsoleColor.BgRed,
        foreground: ConsoleColor.FgBlack
      },
      [ColorTemplate.Blue]: {
        background: ConsoleColor.BgBlue,
        foreground: ConsoleColor.FgBlack
      }
    }


  }

  public customLog(message: string, colorTemplate?: ColorTemplate): void {

    // If no color is provided, just return a simple plain message, without coloring.
    if (colorTemplate === undefined) {
      super.log(message)
      return
    }

    const { background, foreground } = this.colorTemplate[String(colorTemplate) || ColorTemplate.Blue]

    super.log(ConsoleHelper.coloredLog(background, foreground, `🤖: ${message}`, true));


  }

  public log(message: string): void {
    super.log(ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgBlack, `🤖: ${message}`, true));
  }

  public error(message: string, trace: string): void {
    super.error(ConsoleHelper.coloredLog(ConsoleColor.BgRed, ConsoleColor.FgBlack, `🤖: ${message}`), trace)
  }

  public warn(message: string): void {
    super.warn(ConsoleHelper.coloredLog(ConsoleColor.BgYellow, ConsoleColor.FgBlack, `🤖: ${message}`, true));
  }

  public debug(message: string): void {
    super.debug(ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgBlack, `🤖: ${message}`, true));
  }
  public verbose(message: string): void {
    super.verbose(ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgBlack, `🤖: ${message}`, true));
  }
}