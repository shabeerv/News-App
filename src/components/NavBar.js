import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import IconButton from "@mui/material/IconButton";

export default function NavBar() {
  return (
    <AppBar position="relative" color="transparent">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          component="a"
          href="/"
          sx={{ mr: 2 }}
        >
          <ArticleOutlinedIcon fontSize="large" sx={{ mr: 2 }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
