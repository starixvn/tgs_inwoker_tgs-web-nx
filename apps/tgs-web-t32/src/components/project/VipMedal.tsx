import React, { useEffect, useState } from "react";
import Icon from "@/components/project/Icon";

type Props = {
  vipLevel: number;
} & React.HTMLProps<HTMLDivElement>;

const VipMedal = ({ vipLevel }: Props) => {
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

  return <Icon iconUrl={image} width={"40px"} height={"40px"} />;
};

export default VipMedal;
