import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PaginationRounded from "./PaginationRounded";
import { searchArticle } from "../lib/api";
import { Divider } from "@mui/material";
import uuid from "react-uuid";

export default function Search() {
  const [text, setText] = React.useState("");
  const [state, setState] = React.useState([]);
  const [result, setResult] = React.useState([]);
  const [pagination, setPagination] = React.useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const onPageChangeHandler = async (pageNo) => {
    //console.log("pageNo", pageNo);
    await getSearchResults(pageNo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getSearchResults(1);

    const historyList = JSON.parse(localStorage.getItem("history"));
    if (text.length !== 0) {
      if (historyList.length >= 5) {
        historyList.splice(0, 1);
      }
      historyList.push({ id: uuid(), title: text });
      localStorage.setItem("history", JSON.stringify(historyList));
      const newHistoryList = JSON.parse(localStorage.getItem("history"));
      console.log(newHistoryList);
      setState(newHistoryList);
    }

    setPagination(true);

    return;
  };

  const getSearchResults = async (page) => {
    const request = await searchArticle(text, page);
    setResult(request.response.docs);
  };

  React.useEffect(() => {
    const historyList = JSON.parse(localStorage.getItem("history"));

    if (historyList === null) {
      localStorage.setItem("history", JSON.stringify([]));
    }
  }, []);

  const webURL = "https://www.nytimes.com/";

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
              Search
            </Typography>
            <div>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={state.map((option) => {
                  return option.title;
                })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search input"
                    onChange={handleChange}
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button variant="outlined" onClick={handleSubmit}>
                Search
              </Button>
            </div>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {result.map((card) => (
              <Grid item key={card._id} xs={12} sm={6} md={6}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    width="300"
                    height="300"
                    src={
                      card.multimedia?.[0]?.url
                        ? `${webURL}${card.multimedia[0]?.url}`
                        : "https://upload.wikimedia.org/wikipedia/commons/4/40/New_York_Times_logo_variation.jpg"
                    }
                    alt="News Image"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {card.headline.main}
                    </Typography>
                    <Typography color="textSecondary" variant="caption">
                      {card.byline.original} - section: {card.section_name} - published on: {card.pub_date}
                    </Typography>
                    {/* <Typography color="textSecondary" variant="subtitle2">
                      {card.byline.original}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle2">
                      {card.byline.original}
                    </Typography> */}
                    <Divider />
                    <Typography variant="body2" component="p">
                      {card.snippet}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Typography variant="caption">
                      <a href={card.web_url}>View</a>
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        {pagination && <PaginationRounded onPageChange={onPageChangeHandler} />}
      </main>
    </div>
  );
}
