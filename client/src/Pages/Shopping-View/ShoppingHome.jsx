import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannertwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";

import nikeIcon from "../../assets/brand-icons/brand_nike_icon_157863.png";
import pumaIcon from "../../assets/brand-icons/puma.png";
import hnmIcon from "../../assets/brand-icons/hnm.png";
import leviIcon from "../../assets/brand-icons/levis.png";
import zaraIcon from "../../assets/brand-icons/zara.png";
import adiadsIcon from "../../assets/brand-icons/adidas.png";

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
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProduct,
  getProductById,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/Shopping-View/ShoppingProductTile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/Shopping-View/ProductDetailsDialog";

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

const brands = [
  { id: "nike", label: "Nike", icon: nikeIcon },
  { id: "adidas", label: "Adidas", icon: adiadsIcon },
  { id: "puma", label: "Puma", icon: pumaIcon },
  { id: "levi", label: "Levi's", icon: leviIcon },
  { id: "zara", label: "Zara", icon: zaraIcon },
  { id: "h&m", label: "H&M", icon: hnmIcon },
];

export default function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const slides = [bannerOne, bannertwo, bannerThree];
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );

  const navigate = useNavigate();

  // Product details dialog box
  const [open, setOpen] = useState(false);

  function handleNavigateToListingPage(item, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [item.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  }

  function handleProductDetails(id) {
    dispatch(getProductById(id));
    setOpen(true);
  }

  //Handle AddToCart
  function handleAddToCart(productId) {
    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({
            title: "Product added to cart",
          });
        }
      }
    );
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProduct({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  // console.log(productList);

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
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((item) => {
              return (
                <Card
                  onClick={() => {
                    handleNavigateToListingPage(item, "category");
                  }}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    {item.icon}
                    <span className="font-bold">{item.label}</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 mt-5">
            <h2 className="text-3xl font-bold text-center mb-8">
              Shop by Brand
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
              {brands.map((item) => {
                return (
                  <Card
                    onClick={() => {
                      handleNavigateToListingPage(item, "brand");
                    }}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="w-12 h-12 mb-4 text-primary"
                      />
                      <span className="font-bold">{item.label}</span>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((product) => {
                  return (
                    <ShoppingProductTile
                      product={product}
                      handleProductDetails={handleProductDetails}
                      handleAddToCart={handleAddToCart}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={open}
        setOpen={setOpen}
        product={productDetails}
      />
    </div>
  );
}
