'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface MobileMockupProps {
  type?: 'iphone' | 'android';
  src?: string;
  videoSrc?: string;
  alt?: string;
}

const MobileMockup: React.FC<MobileMockupProps> = ({
  type = 'iphone',
  src,
  videoSrc,
  alt = "Application mobile"
}) => {
  return (
    <div className="relative mx-auto border-[#1A1A1A] dark:border-[#0D0D0D] bg-[#0D0D0D] border-[12px] rounded-[2.5rem] h-[580px] w-[280px] shadow-2xl overflow-hidden ring-1 ring-white/10">
      {/* Top speaker / Notch */}
      <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20"></div>

      {/* Side buttons */}
      <div className="h-[46px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg w-[3px]"></div>
      <div className="h-[46px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg w-[3px]"></div>
      <div className="h-[64px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg w-[3px]"></div>

      {/* Screen content */}
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-900 relative">
        {videoSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-500 to-purple-600">
            <span className="text-white text-sm font-medium">Demo Preview</span>
          </div>
        )}
      </div>

      {/* Reflection effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent z-10"></div>
    </div>
  );
};

export default MobileMockup;
