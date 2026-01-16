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
      <div>
        <Navbar />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <Typography variant="h5">Product not found</Typography>
        </Box>
      </div>
    );
  }

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <div>
      <Navbar />
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/products")}
          sx={{ mb: 2 }}
        >
          Back to Products
        </Button>
        <Paper elevation={3} sx={{ p: 4 }}>
          {/* Header Section */}
          <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {/* Main Image */}
            <Box sx={{ flex: "1 1 400px" }}>
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{
                  width: "100%",
                  maxHeight: 400,
                  objectFit: "contain",
                  borderRadius: 8,
                }}
              />
              {/* Image Gallery */}
              {product.images && product.images.length > 1 && (
                <ImageList cols={4} gap={8} sx={{ mt: 2 }}>
                  {product.images.map((img, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={img}
                        alt={`${product.title} ${index + 1}`}
                        style={{
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 4,
                        }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              )}
            </Box>

            {/* Product Info */}
            <Box sx={{ flex: "1 1 400px" }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {product.title}
              </Typography>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Rating value={product.rating} precision={0.1} readOnly />
                <Typography variant="body2" color="text.secondary">
                  ({product.rating})
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <Chip label={product.category} color="primary" size="small" />
                <Chip label={product.brand} variant="outlined" size="small" />
                <Chip
                  label={product.availabilityStatus}
                  color={product.stock > 0 ? "success" : "error"}
                  size="small"
                />
              </Box>

              {product.tags && (
                <Box
                  sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mb: 2 }}
                >
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

              <Typography variant="body1" color="text.secondary" paragraph>
                {product.description}
              </Typography>

              <Box
                sx={{ display: "flex", alignItems: "baseline", gap: 2, mb: 2 }}
              >
                <Typography variant="h4" color="primary" fontWeight="bold">
                  ${discountedPrice.toFixed(2)}
                </Typography>
                {product.discountPercentage > 0 && (
                  <>
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{ textDecoration: "line-through" }}
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

              <Typography variant="body2" color="text.secondary">
                Stock: {product.stock} units | Min Order:{" "}
                {product.minimumOrderQuantity}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Details Section */}
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Product Details
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 2,
              mb: 4,
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary">
                SKU
              </Typography>
              <Typography variant="body1">{product.sku}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Weight
              </Typography>
              <Typography variant="body1">{product.weight} g</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Dimensions (W x H x D)
              </Typography>
              <Typography variant="body1">
                {product.dimensions?.width} x {product.dimensions?.height} x{" "}
                {product.dimensions?.depth} cm
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Warranty
              </Typography>
              <Typography variant="body1">
                {product.warrantyInformation}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Shipping
              </Typography>
              <Typography variant="body1">
                {product.shippingInformation}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Return Policy
              </Typography>
              <Typography variant="body1">{product.returnPolicy}</Typography>
            </Box>
          </Box>

          {/* Meta Info */}
          {product.meta && (
            <>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Additional Information
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 4,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Barcode
                  </Typography>
                  <Typography variant="body1">
                    {product.meta.barcode}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Created At
                  </Typography>
                  <Typography variant="body1">
                    {new Date(product.meta.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Updated At
                  </Typography>
                  <Typography variant="body1">
                    {new Date(product.meta.updatedAt).toLocaleDateString()}
                  </Typography>
                </Box>
                {product.meta.qrCode && (
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      QR Code
                    </Typography>
                    <img
                      src={product.meta.qrCode}
                      alt="QR Code"
                      style={{ width: 80, height: 80 }}
                    />
                  </Box>
                )}
              </Box>
            </>
          )}

          {/* Reviews Section */}
          {product.reviews && product.reviews.length > 0 && (
            <>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Customer Reviews ({product.reviews.length})
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {product.reviews.map((review, index) => (
                  <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        {review.reviewerName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(review.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Rating value={review.rating} size="small" readOnly />
                    <Typography variant="body2" sx={{ mt: 1 }}>
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
