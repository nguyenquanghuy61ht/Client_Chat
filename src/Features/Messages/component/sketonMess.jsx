import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";

function SketonMess({ length }) {
  return (
    <>
      {Array.from(new Array(length)).map((x, index) => (
        <Stack sx={{ marginBottom: "40px" }} key={index}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{ marginRight: "10px", bgcolor: "grey.200" }}
            />
            <Skeleton
              variant="rounded"
              width={163}
              height={40}
              sx={{ bgcolor: "grey.200", borderRadius: "10px" }}
            />
          </Box>
          <Skeleton
            variant="text"
            sx={{
              fontSize: "1rem",
              marginLeft: "50px !important",
              bgcolor: "grey.200",
            }}
            width={79}
          />
        </Stack>
      ))}
    </>
  );
}

export default SketonMess;
