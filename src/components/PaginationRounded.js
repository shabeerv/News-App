import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationRounded({ onPageChange }) {
  const handlePageChange = (pageNumber) => {
    // console.log(parseInt(pageNumber.target.innerText));
    onPageChange(parseInt(pageNumber.target.innerText));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Stack spacing={2}>
        <Pagination
          onChange={handlePageChange}
          count={200}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </div>
  );
}
