import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Product = ({ product }) => {
  const navigate = useNavigate();
  const { id, title, image, price } = product;
  return (
    <Card
      sx={{
        width: 300,
        height: 450,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <CardMedia sx={{ height: 350 }} image={image} title={title} />
      <CardContent
        sx={{
          height: 80,
          overflow: "hidden",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3,
          }}
        >
          {title}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>{price}$</span>
        <Button onClick={() => navigate("/product-details/" + id)} size="small">
          See Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
