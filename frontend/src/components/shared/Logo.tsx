import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
        // backgroundColor: "#004d56", // Add a background color
        padding: "10px", // Add padding to create a colored area
        borderRadius: "5px", // Add rounded corners
        transition: "background-color 0.3s", // Add transition for hover effect
      }}
    >
      <Link to={"/"}>
        <img
          src="logo.png"
          alt="BOT-MORA"
          width={"80px"}
          height={"80px"}
          className="image-inverted"
        />
      </Link>{" "}
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "1000",
          textShadow: "2px 2px 20px #000",
          color: "white", // Set the text color to white
        }}
      >
        <span style={{ fontSize: "20px" }}>BOT</span>-MORA
      </Typography>
    </div>
  );
};

export default Logo;
