import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";

function SketonUser({ length }) {
  return (
    <>
      {Array.from(new Array(length)).map((x, index) => (
        <Stack key={index} sx={{ marginBottom: "25px", marginTop: "10px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{ marginRight: "10px", bgcolor: "grey.200" }}
            />
            <Skeleton
              variant="text"
              sx={{
                fontSize: "1rem",
                marginLeft: "6px !important",
                bgcolor: "grey.200",
              }}
              width={79}
              height={35}
            />
          </Box>
        </Stack>
      ))}
    </>
  );
}

export default SketonUser;
