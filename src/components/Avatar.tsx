import React, { ImgHTMLAttributes } from "react";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
}

const Avatar = ({ hasBorder = true, ...props }: AvatarProps) => {
  return (
    <div
      className={`w-14 h-14 rounded-full border-[px] overflow-hidden ${
        hasBorder &&
        "outline-none outline-green-700 outline-[3px] border-zinc-900"
      }`}
    >
      <img {...props} className="w-full h-full" />
    </div>
  );
};

export default Avatar;
