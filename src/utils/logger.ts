const colors = {
  info: "\x1b[36m", // Cyan
  success: "\x1b[32m", // Green
  error: "\x1b[31m", // Red
  warning: "\x1b[33m", // Yellow
  reset: "\x1b[0m", // Reset
};

export const logger = {
  info: (message: string, data?: any) => {
    console.log(
      `${colors.info}[INFO]${colors.reset} ${message}`,
      data ? data : ""
    );
  },

  success: (message: string, data?: any) => {
    console.log(
      `${colors.success}[SUCCESS]${colors.reset} ${message}`,
      data ? data : ""
    );
  },

  error: (message: string, error?: any) => {
    console.error(
      `${colors.error}[ERROR]${colors.reset} ${message}`,
      error ? error : ""
    );
  },

  warning: (message: string, data?: any) => {
    console.warn(
      `${colors.warning}[WARNING]${colors.reset} ${message}`,
      data ? data : ""
    );
  },

  api: (method: string, url: string, data?: any) => {
    console.log(
      `${colors.info}[API ${method}]${colors.reset} ${url}`,
      data ? `\nData: ${JSON.stringify(data, null, 2)}` : ""
    );
  },
};
