'use client';

import { Variants } from 'framer-motion';
import * as motion from 'framer-motion/client';

function CardImage({ className }: { className?: string }) {
  return (
    <svg
      width="256"
      height="196"
      viewBox="0 0 256 196"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0 33.117C0 16.7879 15.9537 5.22621 31.4714 10.3096L99.4714 32.5855C109.332 35.8156 116 45.0168 116 55.3929V162.883C116 179.212 100.046 190.774 84.5286 185.69L16.5286 163.415C6.66807 160.184 0 150.983 0 140.607V33.117Z"
        fill="#D9D9D9"
      />
      <path
        d="M105 60.2612C105 55.2566 101.894 50.7776 97.2074 49.0229L25.2074 22.0677C17.3633 19.1311 9 24.9302 9 33.3059V78.2387C9 83.2432 12.1058 87.7223 16.7926 89.477L88.7926 116.432C96.6367 119.369 105 113.57 105 105.194V60.2612Z"
        fill="#666666"
      />
      <path
        d="M102 63.2612C102 58.2566 98.8942 53.7776 94.2074 52.0229L22.2074 25.0677C14.3633 22.1311 6 27.9302 6 36.3059V81.2387C6 86.2432 9.1058 90.7223 13.7926 92.477L85.7926 119.432C93.6367 122.369 102 116.57 102 108.194V63.2612Z"
        fill="#B5B3B3"
      />
      <path
        d="M256 33.117C256 16.7879 240.046 5.22621 224.529 10.3096L156.529 32.5855C146.668 35.8156 140 45.0168 140 55.3929V162.883C140 179.212 155.954 190.774 171.471 185.69L239.471 163.415C249.332 160.184 256 150.983 256 140.607V33.117Z"
        fill="#D9D9D9"
      />
      <path
        d="M151 60.2612C151 55.2566 154.106 50.7776 158.793 49.0229L230.793 22.0677C238.637 19.1311 247 24.9302 247 33.3059V78.2387C247 83.2432 243.894 87.7223 239.207 89.477L167.207 116.432C159.363 119.369 151 113.57 151 105.194V60.2612Z"
        fill="#666666"
      />
      <path
        d="M154 63.2612C154 58.2566 157.106 53.7776 161.793 52.0229L233.793 25.0677C241.637 22.1311 250 27.9302 250 36.3059V81.2387C250 86.2432 246.894 90.7223 242.207 92.477L170.207 119.432C162.363 122.369 154 116.57 154 108.194V63.2612Z"
        fill="#B5B3B3"
      />
    </svg>
  );
}

const marqueeVariants: Variants = {
  animate: {
    x: [0, -256 - 24],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 8,
        ease: 'linear',
      },
    },
  },
};

export function ImageMarquee() {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-6 pr-6"
        variants={marqueeVariants}
        animate="animate"
      >
        <CardImage className="shrink-0" />
        <CardImage className="shrink-0" />
        <CardImage className="shrink-0" />
        <CardImage className="shrink-0" />
      </motion.div>
    </div>
  );
}
