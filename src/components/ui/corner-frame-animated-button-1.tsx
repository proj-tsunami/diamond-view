'use client'

import type { FC } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

type CornerFrameAnimatedButtonProps = {
  buttonText?: string
  className?: string
  color?: string
} & HTMLMotionProps<"button">

const CornerFrameAnimatedButton: FC<CornerFrameAnimatedButtonProps> = ({
  buttonText = 'Hover Button',
  className,
  color = 'bg-gradient-to-r from-[#181919] via-[#2A2B2B] to-[#181919]',
  onClick,
  ...props
}) => {
  return (
    <motion.button
      type="button"
      className={cn(
        'relative px-8 py-4 bg-transparent border-0 font-display font-black text-sm uppercase tracking-widest',
        'text-charcoal focus-visible:outline-none cursor-pointer',
        className
      )}
      onClick={onClick}
      whileHover="hover"
      whileTap="tap"
      variants={{
        tap: { scale: 0.98 }
      }}
      {...props}
    >
      <motion.div
        className={cn(
          'absolute inset-0 pointer-events-none',
          '[background-image:linear-gradient(to_right,currentColor_1.5px,transparent_1.5px),linear-gradient(to_right,currentColor_1.5px,transparent_1.5px),linear-gradient(to_left,currentColor_1.5px,transparent_1.5px),linear-gradient(to_left,currentColor_1.5px,transparent_1.5px),linear-gradient(to_bottom,currentColor_1.5px,transparent_1.5px),linear-gradient(to_bottom,currentColor_1.5px,transparent_1.5px),linear-gradient(to_top,currentColor_1.5px,transparent_1.5px),linear-gradient(to_top,currentColor_1.5px,transparent_1.5px)]',
          '[background-position:0_0,0_100%,100%_0,100%_100%,0_0,100%_0,0_100%,100%_100%]',
          '[background-size:10px_10px]',
          '[background-repeat:no-repeat]'
        )}
        variants={{
          hover: {
            opacity: 0,
            transition: { duration: 0.2 }
          }
        }}
      />

      {/* Gradient background on hover */}
      <motion.div
        className={cn('absolute inset-0', color)}
        initial={{ opacity: 0 }}
        variants={{
          hover: {
            opacity: 1,
            transition: { duration: 0.3, ease: 'easeOut' }
          }
        }}
      />

      {/* Button text */}
      <motion.span
        className="relative z-10 transition-colors duration-300"
        variants={{
          hover: {
            color: 'white',
          }
        }}>
        {buttonText}
      </motion.span>
    </motion.button>
  )
}

export default CornerFrameAnimatedButton
