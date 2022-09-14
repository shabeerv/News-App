import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function BasicCard({ data }) {
  const navigate = useNavigate();
  const readMoreClickHandler = (items) => {
    console.log(items);
    localStorage.setItem("article", JSON.stringify(items));
    navigate("/view");
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "30px" }}
    >
      {data.map((items) => {
        if (items.title.length !== 0) {
          return (
            <>
              <Card variant="outlined" key={items.url} sx={{ minWidth: 300 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {items.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    key={items.url}
                    size="small"
                    onClick={() => {
                      readMoreClickHandler(items);
                    }}
                  >
                    Read More
                  </Button>
                </CardActions>
              </Card>
              <br />
            </>
          );
        }
        return null;
      })}
    </div>
  );
}
