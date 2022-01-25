import React from "react";
import { Paper, Container, Typography, Box } from "@mui/material";

const Site = () => {
  return (
    <div>
      <Paper
        elevation={0}
        square
        sx={{ height: "100vh", margin: "0px", paddingTop: "2rem" }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4">Namsan Site</Typography>
          {/* NOTE Box will wrap site info-cards */}
          <Box component="div" sx={{ marginTop: "1.5rem" }}></Box>
        </Container>
      </Paper>
    </div>
  );
};
export default Site;
