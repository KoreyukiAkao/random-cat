import { connection } from "next/server";
import { CatImage } from "./cat-image";
import { fetchImage } from "./fetch-images";

export default async function Home() {
  // ビルド時にfetchImageの結果が固定されないようにする
  await connection();
  // APIから画像Uを取得
  const image = await fetchImage();
  // 画像のURLを渡す
  return <CatImage url={image.url} />;
}
