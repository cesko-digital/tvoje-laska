"use client";

import { useState } from "react";
import Card from "library/atoms/Card";
import Image from "next/image";
import { ArrowLeftSvg, ArrowRightSvg } from "library/icons/arrows";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  testimonials: any[]; //TODO: Jaký bude typ contentu?
  variant: "with-image" | "without-image";
};

const Carousel = ({ testimonials, variant }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");

  const nextSlide = () => {
    setSlideDirection("right");
    setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    }, 100);
  };

  const prevSlide = () => {
    setSlideDirection("left");
    setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex - 1 + testimonials.length) % testimonials.length);
    }, 100);
  };

  const goToSlide = (index: number) => {
    if (index < currentIndex) {
      setSlideDirection("left");
    } else {
      setSlideDirection("right");
    }

    setTimeout(() => {
      setCurrentIndex(index);
    }, 300);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="relative flex justify-center text-gray-100 italic">
        <button onClick={prevSlide} className="text-violet-70 absolute left-0 top-1/2 transform -translate-y-1/2">
          <ArrowLeftSvg width={20} />
        </button>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: slideDirection === "right" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: slideDirection === "right" ? -50 : 50 }}
            transition={{ duration: 0.3 }}
          >
            {/* TODO: Upravit podle typu contentu */}
            {testimonials.map((testimonial, index) => {
              if (index === currentIndex) {
                return (
                  <Card
                    key={index}
                    className="max-w-[258px] flex flex-col justify-center items-center gap-2.5"
                    variant="default"
                  >
                    {variant === "with-image" && (
                      <Image src={testimonial.image} width={145} height={180} alt="Carousel image" />
                    )}
                    <div className="flex flex-col gap-2.5">
                      <p className="text-start">{testimonial.content}</p>
                      <p className="text-end text-gray-60">{testimonial.name}</p>
                    </div>
                  </Card>
                );
              }
            })}
          </motion.div>
        </AnimatePresence>
        <button onClick={nextSlide} className="text-violet-70 absolute right-0 top-1/2 transform -translate-y-1/2">
          <ArrowRightSvg width={20} />
        </button>
      </div>

      <div className="flex justify-center gap-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-5 h-5 rounded-full ${currentIndex === index ? "bg-violet-70" : "bg-violet-20"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;