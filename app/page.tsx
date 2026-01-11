import { connection } from "next/server";
import { CatImage } from "./cat-image";
import { fetchImage } from "./fetch-images";

export default async function Home() {
  // ビルド時にfetchImageの結果が固定されないようにする
  await connection();
  // APIから画像URLを取得
  let image = null;
  try {
    image = await fetchImage();
  } catch (error) {
    console.error("Failed to fetch cat image:", error);
  }

  // 画像のURLを渡す
  if (image) {
    return <CatImage url={image.url} />;
  }

  return <div>画像の取得に失敗しました。後ほど再試行してください。</div>;
}
