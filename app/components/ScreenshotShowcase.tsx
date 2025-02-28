import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {
  imgSrc: string;
  ySpace: number;
}
export default function ScreenshotShowcase({ imgSrc, ySpace }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="relative flex justify-center items-center h-48 bg-blue-100 overflow-hidden mt-8 md:mt-0">
      {/* Background Box */}
      <div className="absolute inset-0 bg-blue-200 rounded-lg shadow-lg"></div>

      {/* Screenshot Image */}
      <motion.img
        ref={ref}
        src={imgSrc} // Change to your actual image path
        alt="Screenshot"
        className="absolute rounded-lg shadow-xl"
        initial={{ scale: 0.8, y: 100 }}
        animate={isInView ? { scale: 0.8, y: ySpace } : {}}
        transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
      />
    </div>
  );
}
