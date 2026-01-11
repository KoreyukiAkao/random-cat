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

  const refreshImage = async () => {
    setImageUrl("");
    const image = await fetchImage();
    setImageUrl(image.url);
  };

  return (
    <div className={styles.page}>
      <button className={styles.button} onClick={refreshImage}>他のニャンコも見る👀</button>
      <div className={styles.frame}>
      {imageUrl && <Image className={styles.img} src={imageUrl} alt="猫の画像" width={500} height={500} />}
      </div>
    </div>
  );
}
