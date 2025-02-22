import ProductDetailsDialog from "@/components/Shopping-View/ProductDetailsDialog";
import ProductFilter from "@/components/Shopping-View/ProductFilter";
import ShoppingProductTile from "@/components/Shopping-View/ShoppingProductTile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import {
  fetchAllFilteredProduct,
  getProductById,
} from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

export default function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  // State for managing filters and sort
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Product details dialog box
  const [open, setOpen] = useState(false);

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getCurrentSection, getCurrentOption) {
    let copyFilters = { ...filters };
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getCurrentSection);
    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [getCurrentSection]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        copyFilters[getCurrentSection].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        copyFilters[getCurrentSection].push(getCurrentOption);
      } else {
        copyFilters[getCurrentSection].splice(indexOfCurrentOption, 1);
      }
    }
    setFilters(copyFilters);
    // Setting it in sessionStorage so filters keep up even after page reload
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  }

  //
  async function handleProductDetails(id) {
    await dispatch(getProductById(id));
    setOpen(true);
    console.log(productDetails);
  }

  // Setting up filters and sort on page load
  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  //
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);
  // Fetch list of all filtered product
  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProduct({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpen(true);
    }
  }, [productDetails]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground ">
              {productList?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="w-4 h-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((option) => {
                    return (
                      <DropdownMenuRadioItem value={option.id} key={option.id}>
                        {option.label}
                      </DropdownMenuRadioItem>
                    );
                  })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((product, productIdx) => {
                return (
                  <ShoppingProductTile
                    key={productIdx}
                    product={product}
                    handleProductDetails={handleProductDetails}
                  />
                );
              })
            : null}
        </div>
      </div>
      <ProductDetailsDialog
        open={open}
        setOpen={setOpen}
        product={productDetails}
      />
    </div>
  );
}
