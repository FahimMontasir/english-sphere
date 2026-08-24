type LogMethod = (message: string, ...details: unknown[]) => void;

interface Logger {
  error: LogMethod;
  info: LogMethod;
  warn: LogMethod;
}

export const logger: Logger = {
  error(message, ...details) {
    console.error(message, ...details);
  },
  info(message, ...details) {
    console.info(message, ...details);
  },
  warn(message, ...details) {
    console.warn(message, ...details);
  },
};
