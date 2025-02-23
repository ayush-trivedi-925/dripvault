import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannertwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  Baby,
  Cat,
  ChevronLeftIcon,
  ChevronRightIcon,
  Footprints,
  Gem,
  ShirtIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [bannerOne, bannertwo, bannerThree];
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [currentSlide]);
  const categories = [
    {
      id: "men",
      label: "Men",
      icon: <ShirtIcon className="w-12 h-12 mb-4 text-primary" />,
    },
    {
      id: "women",
      label: "Women",
      icon: <Cat className="w-12 h-12 mb-4 text-primary" />,
    },
    {
      id: "kids",
      label: "Kids",
      icon: <Baby className="w-12 h-12 mb-4 text-primary" />,
    },
    {
      id: "accessories",
      label: "Accessories",
      icon: <Gem className="w-12 h-12 mb-4 text-primary" />,
    },
    {
      id: "footwear",
      label: "Footwear",
      icon: <Footprints className="w-12 h-12 mb-4 text-primary" />,
    },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, slideIdx) => {
          return (
            <img
              src={slide}
              alt={slideIdx}
              className={`${
                slideIdx === currentSlide ? "opacity-100" : "opacity-0"
              } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
            />
          );
        })}
        <Button
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((item) => {
              return (
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    {item.icon}
                    <span className="font-bold">{item.label}</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
