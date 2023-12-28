import React, { useEffect, useState } from "react";
import Icon from "@/components/project/Icon";

type Props = {
  vipLevel: number;
  width?: string;
} & React.HTMLProps<HTMLDivElement>;

const VipMedal = ({ vipLevel, width = "66px", ...others }: Props) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const dynamicImage = `/assets/images/vip/level_${vipLevel}.png`;
        setImage(dynamicImage);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImage();
  }, [vipLevel]);

  if (!image) return null;

  // @ts-ignore
  return <Icon {...others} iconUrl={image} width={width} height={width} />;
};

export default VipMedal;
