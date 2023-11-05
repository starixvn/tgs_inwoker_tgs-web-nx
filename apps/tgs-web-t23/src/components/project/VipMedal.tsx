import React, { useState, useEffect } from "react";
import Icon from "@/components/project/Icon";

type Props = {
  vipLevel: number;
} & React.HTMLProps<HTMLDivElement>;

const VipMedal = ({ vipLevel }: Props) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        //@ts-ignore
        const dynamicImage = await import(`@/assets/t23/images/vip/level_${vipLevel}.png`);
        setImage(dynamicImage.default);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImage();
  }, []);

  if (!image) return null;

  return <Icon iconUrl={image} width={"66px"} height={"66px"} />;
};

export default VipMedal;
