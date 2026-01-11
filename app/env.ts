const getRequiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`環境変数 ${key} が設定されていません`);
  }
  return value;
};

let cachedApiKey: string | undefined;

export function getApiKey(): string {
  if (cachedApiKey === undefined) {
    cachedApiKey = getRequiredEnv("CAT_API_KEY");
  }
  return cachedApiKey;
}