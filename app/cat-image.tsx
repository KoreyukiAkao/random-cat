"use client";

import { useState } from "react";
import { fetchImage } from "./fetch-images";
import Image from "next/image";
import styles from "./page.module.css";

type CatImageProps = {
  url: string;
};

export function CatImage({ url }: CatImageProps) {
  const [imageUrl, setImageUrl] = useState(url);
  const [error, setError] = useState<string | null>(null);

  const refreshImage = async () => {
    const previousImage = imageUrl;
    setImageUrl("");
    setError(null);
    try {
      const image = await fetchImage();
      setImageUrl(image.url);
    } catch (err) {
      console.error("画像の取得に失敗しました:", err);
      setImageUrl(previousImage);
      setError(err instanceof Error ? err.message : "画像の取得に失敗しました");
    }
  };

  return (
    <div className={styles.page}>
      <button className={styles.button} onClick={refreshImage}>他のニャンコも見る😻</button>
      {error && <div style={{ color: "red", marginBottom: "8px" }}>{error}</div>}
      <div className={styles.frame}>
      {imageUrl && <Image className={styles.img} src={imageUrl} alt="猫の画像" width={400} height={400} />}
      </div>
    </div>
  );
}
