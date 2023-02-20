import React, { ImgHTMLAttributes } from 'react'
import * as RadixAvatar from '@radix-ui/react-avatar'
import { User } from 'phosphor-react'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean
}

const Avatar = ({ hasBorder = true, ...props }: AvatarProps) => {
  return (
    <>
      <RadixAvatar.Root
        className={`w-14 h-14 rounded-full border-[px] overflow-hidden 
              bg-gray-500 flex items-center justify-center ${
                hasBorder &&
                'outline-none outline-green-700 outline-[3px] border-zinc-900'
              }`}
      >
        <RadixAvatar.Image {...props} className='w-full h-full' />
        <RadixAvatar.Fallback className='' delayMs={600}>
          <User size={32} />
        </RadixAvatar.Fallback>
      </RadixAvatar.Root>

      {/* <div
      className={`w-14 h-14 rounded-full border-[px] overflow-hidden ${
        hasBorder &&
        "outline-none outline-green-700 outline-[3px] border-zinc-900"
      }`}
      >
     
    </div> */}
    </>
  )
}

export default Avatar
