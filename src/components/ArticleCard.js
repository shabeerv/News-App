import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { getComments } from "../lib/api";

export default function ArticleCard() {
  const [articleList, setArticleList] = React.useState({});
  const [comments, setComments] = React.useState([]);

  const getAllComments = async () => {
    const commentsList = await getComments();
    setComments(commentsList.comments);
  };

  React.useEffect(() => {
    getArticleCard();
    getAllComments();
  }, []);

  const getArticleCard = async () => {
    const articles = await JSON.parse(localStorage.getItem("article"));
    setArticleList(articles);
  };

  //console.log(articleList.multimedia[0]);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <Card sx={{ maxWidth: 800 }}>
        <CardMedia component="img" height="" width="" image="" />
        <CardContent>
          <Typography component="h1" variant="h3" gutterBottom>
            {articleList.title}
          </Typography>
          <Typography variant="caption" gutterBottom>
            {articleList.section} news - {articleList.byline} - Published on:{" "}
            {articleList.published_date}
          </Typography>
          <Divider />
          <Typography variant="body1" paragraph>
            {articleList.abstract}
          </Typography>
          <Typography variant="caption">
            <a href={articleList.url}>Web resource</a>
          </Typography>
          <Divider />
          <Typography variant="h6">Comments</Typography>
          {comments.map((items) => {
            return (
              <div key={items.id}>
                <Typography variant="body2">
                  {items.user.username}: {items.body}
                </Typography>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}