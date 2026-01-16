import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "./ui/Navbar";
import styles from "./Products.module.css";

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
}

const PRODUCTS_CACHE_KEY = "cached_products";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if products are cached in sessionStorage
    const cachedProducts = sessionStorage.getItem(PRODUCTS_CACHE_KEY);

    if (cachedProducts) {
      // Use cached data
      setProducts(JSON.parse(cachedProducts));
      setLoading(false);
    } else {
      // Fetch from API
      axios
        .get("https://dummyjson.com/products", {
          params: {
            // skip: 5,
            limit: 8,
          },
        })
        .then(function (response) {
          const productsData = response.data.products;
          setProducts(productsData);
          // Cache the data in sessionStorage
          sessionStorage.setItem(
            PRODUCTS_CACHE_KEY,
            JSON.stringify(productsData)
          );
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return (
      <div className={styles.productsContainer}>
        <Navbar />
        <Box className={styles.loadingContainer}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  return (
    <div className={styles.productsContainer}>
      <Navbar />
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table aria-label="products table" className={styles.table}>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell className={styles.tableHeadCell}>Image</TableCell>
              <TableCell className={styles.tableHeadCell}>
                Product Name
              </TableCell>
              <TableCell align="right" className={styles.tableHeadCell}>
                Brand
              </TableCell>
              <TableCell align="right" className={styles.tableHeadCell}>
                Category
              </TableCell>
              <TableCell align="right" className={styles.tableHeadCell}>
                Price
              </TableCell>
              <TableCell align="right" className={styles.tableHeadCell}>
                Stock
              </TableCell>
              <TableCell align="right" className={styles.tableHeadCell}>
                Rating
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                hover
                onClick={() => navigate(`/view-product?id=${product.id}`)}
                className={styles.tableRow}
              >
                <TableCell>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className={styles.productThumbnail}
                  />
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  className={styles.productTitle}
                >
                  {product.title}
                </TableCell>
                <TableCell align="right" className={styles.productBrand}>
                  {product.brand}
                </TableCell>
                <TableCell align="right" className={styles.productCategory}>
                  {product.category}
                </TableCell>
                <TableCell align="right" className={styles.productPrice}>
                  ${product.price}
                </TableCell>
                <TableCell align="right" className={styles.productStock}>
                  {product.stock}
                </TableCell>
                <TableCell align="right" className={styles.productRating}>
                  {product.rating}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
