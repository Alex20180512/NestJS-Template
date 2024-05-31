import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/BeiJing');

const dateFormat = 'YYYY-MM-DD HH:mm:ss:SSS';

export const logger = WinstonModule.createLogger({
  transports: [
    new transports.DailyRotateFile({
      filename: `logs/%DATE%-error.log`,
      level: 'error',
      format: format.combine(
        format.printf((info) => {
          return `[${dayjs(info.timestamp).format(dateFormat)}][${info.level}] ${info.message.trim()}`;
        }),
      ),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxFiles: '30d',
    }),
    new transports.DailyRotateFile({
      filename: `logs/%DATE%-info.log`,
      format: format.combine(
        format.printf((info) => {
          return `[${dayjs(info.timestamp).format(dateFormat)}][${info.level}] ${info.message.trim()}`;
        }),
      ),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxFiles: '30d',
    }),
    new transports.Console({
      format: format.combine(
        format.cli(),
        format.splat(),
        format.printf((info) => {
          return `[${dayjs(info.timestamp).format(dateFormat)}][${info.level}] ${info.message.trim()}`;
        }),
      ),
    }),
  ],
});
