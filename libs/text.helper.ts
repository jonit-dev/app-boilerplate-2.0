import { Injectable } from '@nestjs/common';

@Injectable()
export class TextHelper {
  public capitalizeFirstLetter(string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  private escapeRegExp(str): string {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  }
  public replaceAll(str, find, replace): string {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }

  public stringPrepare(str: string): string {
    return str.toLowerCase().trim();
  }

  public getFileExtension(path: string): string {
    return path.slice((Math.max(0, path.lastIndexOf('.')) || Infinity) + 1);
  }
}
