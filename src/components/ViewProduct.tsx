import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Rating,
  Divider,
  ImageList,
  ImageListItem,
  CircularProgress,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Navbar from "./ui/Navbar";
import styles from "./ViewProduct.module.css";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
}

export default function ViewProduct() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate("/products");
      return;
    }
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) {
    return (
      <div className={styles.viewProductContainer}>
        <Navbar />
        <Box className={styles.loadingContainer}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.viewProductContainer}>
        <Navbar />
        <Box className={styles.loadingContainer}>
          <Typography variant="h5">Product not found</Typography>
        </Box>
      </div>
    );
  }

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <div className={styles.viewProductContainer}>
      <Navbar />
      <Box className={styles.contentWrapper}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/products")}
          className={styles.backButton}
        >
          Back to Products
        </Button>
        <Paper elevation={3} className={styles.productCard}>
          {/* Header Section */}
          <Box className={styles.headerSection}>
            {/* Main Image */}
            <Box className={styles.imageSection}>
              <img
                src={product.thumbnail}
                alt={product.title}
                className={styles.mainImage}
              />
              {/* Image Gallery */}
              {product.images && product.images.length > 1 && (
                <ImageList cols={4} gap={8} className={styles.imageGallery}>
                  {product.images.map((img, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={img}
                        alt={`${product.title} ${index + 1}`}
                        className={styles.galleryImage}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              )}
            </Box>

            {/* Product Info */}
            <Box className={styles.infoSection}>
              <Typography variant="h4" className={styles.productTitle}>
                {product.title}
              </Typography>

              <Box className={styles.ratingContainer}>
                <Rating value={product.rating} precision={0.1} readOnly />
                <Typography variant="body2" className={styles.ratingText}>
                  ({product.rating})
                </Typography>
              </Box>

              <Box className={styles.chipContainer}>
                <Chip label={product.category} color="primary" size="small" />
                <Chip label={product.brand} variant="outlined" size="small" />
                <Chip
                  label={product.availabilityStatus}
                  color={product.stock > 0 ? "success" : "error"}
                  size="small"
                />
              </Box>

              {product.tags && (
                <Box className={styles.tagsContainer}>
                  {product.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              )}

              <Typography variant="body1" className={styles.description}>
                {product.description}
              </Typography>

              <Box className={styles.priceContainer}>
                <Typography variant="h4" className={styles.discountedPrice}>
                  ${discountedPrice.toFixed(2)}
                </Typography>
                {product.discountPercentage > 0 && (
                  <>
                    <Typography
                      variant="h6"
                      className={styles.originalPrice}
                    >
                      ${product.price}
                    </Typography>
                    <Chip
                      label={`-${product.discountPercentage}%`}
                      color="error"
                      size="small"
                    />
                  </>
                )}
              </Box>

              <Typography variant="body2" className={styles.stockInfo}>
                Stock: {product.stock} units | Min Order:{" "}
                {product.minimumOrderQuantity}
              </Typography>
            </Box>
          </Box>

          <Divider className={styles.divider} />

          {/* Details Section */}
          <Typography variant="h5" className={styles.sectionTitle}>
            Product Details
          </Typography>
          <Box className={styles.detailsGrid}>
            <Box className={styles.detailItem}>
              <Typography variant="body2" className={styles.detailLabel}>
                SKU
              </Typography>
              <Typography variant="body1" className={styles.detailValue}>{product.sku}</Typography>
            </Box>
            <Box className={styles.detailItem}>
              <Typography variant="body2" className={styles.detailLabel}>
                Weight
              </Typography>
              <Typography variant="body1" className={styles.detailValue}>{product.weight} g</Typography>
            </Box>
            <Box className={styles.detailItem}>
              <Typography variant="body2" className={styles.detailLabel}>
                Dimensions (W x H x D)
              </Typography>
              <Typography variant="body1" className={styles.detailValue}>
                {product.dimensions?.width} x {product.dimensions?.height} x{" "}
                {product.dimensions?.depth} cm
              </Typography>
            </Box>
            <Box className={styles.detailItem}>
              <Typography variant="body2" className={styles.detailLabel}>
                Warranty
              </Typography>
              <Typography variant="body1">
                {product.warrantyInformation}
              </Typography>
            </Box>
            <Box className={styles.detailItem}>
              <Typography variant="body2" className={styles.detailLabel}>
                Shipping
              </Typography>
              <Typography variant="body1" className={styles.detailValue}>
                {product.shippingInformation}
              </Typography>
            </Box>
            <Box className={styles.detailItem}>
              <Typography variant="body2" className={styles.detailLabel}>
                Return Policy
              </Typography>
              <Typography variant="body1" className={styles.detailValue}>{product.returnPolicy}</Typography>
            </Box>
          </Box>

          {/* Meta Info */}
          {product.meta && (
            <>
              <Divider className={styles.divider} />
              <Typography variant="h5" className={styles.sectionTitle}>
                Additional Information
              </Typography>
              <Box className={styles.metaSection}>
                <Box className={styles.detailItem}>
                  <Typography variant="body2" className={styles.detailLabel}>
                    Barcode
                  </Typography>
                  <Typography variant="body1" className={styles.detailValue}>
                    {product.meta.barcode}
                  </Typography>
                </Box>
                <Box className={styles.detailItem}>
                  <Typography variant="body2" className={styles.detailLabel}>
                    Created At
                  </Typography>
                  <Typography variant="body1" className={styles.detailValue}>
                    {new Date(product.meta.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box className={styles.detailItem}>
                  <Typography variant="body2" className={styles.detailLabel}>
                    Updated At
                  </Typography>
                  <Typography variant="body1">
                    {new Date(product.meta.updatedAt).toLocaleDateString()}
                  </Typography>
                </Box>
                {product.meta.qrCode && (
                  <Box className={styles.detailItem}>
                    <Typography variant="body2" className={styles.detailLabel}>
                      QR Code
                    </Typography>
                    <img
                      src={product.meta.qrCode}
                      alt="QR Code"
                      className={styles.qrCode}
                    />
                  </Box>
                )}
              </Box>
            </>
          )}

          {/* Reviews Section */}
          {product.reviews && product.reviews.length > 0 && (
            <>
              <Divider className={styles.divider} />
              <Typography variant="h5" className={styles.sectionTitle}>
                Customer Reviews ({product.reviews.length})
              </Typography>
              <Box className={styles.reviewsContainer}>
                {product.reviews.map((review, index) => (
                  <Paper key={index} variant="outlined" className={styles.reviewCard}>
                    <Box className={styles.reviewHeader}>
                      <Typography variant="subtitle1" className={styles.reviewerName}>
                        {review.reviewerName}
                      </Typography>
                      <Typography variant="caption" className={styles.reviewDate}>
                        {new Date(review.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Rating value={review.rating} size="small" readOnly />
                    <Typography variant="body2" className={styles.reviewComment}>
                      {review.comment}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </div>
  );
}
