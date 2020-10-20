import { Logger } from '@nestjs/common';

import { ConsoleHelper } from '../libs/console.helper';
import { ConsoleColor } from '../types/console.types';
import { EnvTypes } from '../types/env.types';

export enum ColorTemplate {
  Yellow,
  Red,
  Blue,
}

interface IColorTemplate {
  [color: string]: {
    background: ConsoleColor;
    foreground: ConsoleColor;
  };
}

export class CustomLogger extends Logger {
  public colorTemplate: IColorTemplate;

  private consoleHelper: ConsoleHelper;

  constructor(context: string) {
    super(context);

    this.consoleHelper = new ConsoleHelper();

    this.colorTemplate = {
      [ColorTemplate.Yellow]: {
        background: ConsoleColor.BgYellow,
        foreground: ConsoleColor.FgBlack,
      },
      [ColorTemplate.Red]: {
        background: ConsoleColor.BgRed,
        foreground: ConsoleColor.FgBlack,
      },
      [ColorTemplate.Blue]: {
        background: ConsoleColor.BgBlue,
        foreground: ConsoleColor.FgBlack,
      },
    };
  }

  public devLog(message: string, colorTemplate?: ColorTemplate): void {
    if (process.env.ENV !== EnvTypes.Development) {
      return;
    }

    this.customLog(message, colorTemplate);
  }

  public customLog(message: string, colorTemplate?: ColorTemplate): void {
    // If no color is provided, just return a simple plain message, without coloring.
    if (colorTemplate === undefined) {
      super.log(message);
      return;
    }

    const { background, foreground } = this.colorTemplate[
      String(colorTemplate) || ColorTemplate.Blue
    ];

    super.log(
      this.consoleHelper.coloredLog(
        background,
        foreground,
        `🤖: ${message}`,
        true,
      ),
    );
  }

  public log(message: string): void {
    super.log(
      this.consoleHelper.coloredLog(
        ConsoleColor.BgBlue,
        ConsoleColor.FgBlack,
        `🤖: ${message}`,
        true,
      ),
    );
  }

  public error(message: string, trace: string): void {
    super.error(
      this.consoleHelper.coloredLog(
        ConsoleColor.BgRed,
        ConsoleColor.FgBlack,
        `🤖: ${message}`,
      ),
      trace,
    );
  }

  public warn(message: string): void {
    super.warn(
      this.consoleHelper.coloredLog(
        ConsoleColor.BgYellow,
        ConsoleColor.FgBlack,
        `🤖: ${message}`,
        true,
      ),
    );
  }

  public debug(message: string): void {
    super.debug(
      this.consoleHelper.coloredLog(
        ConsoleColor.BgBlue,
        ConsoleColor.FgBlack,
        `🤖: ${message}`,
        true,
      ),
    );
  }
  public verbose(message: string): void {
    super.verbose(
      this.consoleHelper.coloredLog(
        ConsoleColor.BgBlue,
        ConsoleColor.FgBlack,
        `🤖: ${message}`,
        true,
      ),
    );
  }
}
