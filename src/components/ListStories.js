import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { fetchWorldNews } from "../lib/api";
import BasicCard from "./ResultCard";
import { useNavigate } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        News
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function ListStories() {
  const [isWorldNews, setisWorldNews] = React.useState(true);
  const [worldNews, setWorldNews] = React.useState([]);
  const [scienceNews, setScienceNews] = React.useState([]);

  const navigate = useNavigate();

  const onWorldClickHandler = (e) => {
    setisWorldNews(true);
    getNews("world");
  };

  const onScienceClickHandler = (e) => {
    setisWorldNews(false);
    getNews("science");
  };

  const getNews = async (type) => {
    const request = await fetchWorldNews(type);
    console.log(request.results);
    if (type === "world") {
      setWorldNews(request.results);
    } else {
      setScienceNews(request.results);
    }
    return request;
  };
  React.useEffect(() => {
    getNews("world");
  }, []);
  return (
    <div>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              News
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              A simple news app showing top stories from the New York Times
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="outlined"
                color="error"
                onClick={onWorldClickHandler}
              >
                World
              </Button>
              <Button
                variant="outlined"
                color="success"
                onClick={onScienceClickHandler}
              >
                Science
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  navigate("/search");
                }}
              >
                Search
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 2 }} maxWidth="md">
          {/* End hero unit */}
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            {isWorldNews ? "World" : "Science"}
          </Typography>
          {isWorldNews ? (
            <BasicCard data={worldNews} />
          ) : (
            <BasicCard data={scienceNews} />
          )}
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          News
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </div>
  );
}
