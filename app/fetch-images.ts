"use server";

import { z } from "zod";
import { getApiKey } from "./env";
import { logger } from "./logger";

const ImageSchema = z.object({
  url: z.url(),
});

export type Image = z.infer<typeof ImageSchema>;

const ImagesArraySchema = z.array(ImageSchema);

export async function fetchImage(): Promise<Image> {
  const res = await fetch("https://api.thecatapi.com/v1/images/search", {
    headers: { "x-api-key": getApiKey() }, // 追加
  });

  if (!res.ok) {
    throw new Error(`APIエラー: ${res.status} ${res.statusText}`);
  }

  const rowData = await res.json();
  const images = ImagesArraySchema.parse(rowData);

  if (images.length === 0) {
    throw new Error("画像データが取得できませんでした");
  }

  logger.info("fetchImage: 画像情報を取得しました", { images });
  return images[0];
}
