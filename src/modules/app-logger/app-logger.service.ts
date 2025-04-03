import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class AppLoggerService extends ConsoleLogger {
  async logToFile(entry: string) {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Asia/Ho_Chi_Minh',
    }).format(new Date())}\t${entry}\n`;

    try {
      const logDir = path.join(process.cwd(), 'logs');
      if (!fs.existsSync(logDir)) {
        await fsPromises.mkdir(logDir);
      }
      await fsPromises.appendFile(path.join(logDir, 'myLogFile.log'), formattedEntry);
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  }

  log(message: object | string, context?: string) {
    const entry = `${context}\t${message}`;
    void this.logToFile(entry);
    super.log(message, context);
  }

  error(message: object | string, context: string) {
    const entry = `${context}\t${message}`;
    void this.logToFile(entry);
    super.log(message, context);
  }
}
