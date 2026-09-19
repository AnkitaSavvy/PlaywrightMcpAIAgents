export function createLogger(scope: string) {
  const write = (level: string, message: string) =>
    console.log(`${new Date().toISOString()} [${level}] [${scope}] ${message}`);
  return {
    info: (message: string) => write('info', message),
    warn: (message: string) => write('warn', message),
  };
}
