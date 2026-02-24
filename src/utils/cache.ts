/**
 * 简易缓存：把 Mint 与 ATA 地址写入 .cache.json，方便后续脚本读取使用。
 */
import fs from "fs";

const CACHE = ".cache.json";

type CacheShape = {
  mint?: string;
  ata?: string;
};

export function readCache(): CacheShape {
  if (!fs.existsSync(CACHE)) return {};
  return JSON.parse(fs.readFileSync(CACHE, "utf8"));
}

export function writeCache(next: CacheShape) {
  const prev = readCache();
  const merged = { ...prev, ...next };
  fs.writeFileSync(CACHE, JSON.stringify(merged, null, 2));
  return merged;
}
``
