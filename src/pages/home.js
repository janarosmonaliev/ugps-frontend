import {
  Container,
  Paper,
  Typography,
  Grid,
  LinearProgress,
  Button,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { red, green, yellow } from "@mui/material/colors";

const ButtonCell = (props) => {
  return (
    <Grid item>
      <Box textAlign="center">
        <Typography variant="caption">Action</Typography>
        <Button
          variant="contained"
          size="medium"
          sx={{ display: "block", textTransform: "none" }}
          color="success"
        >
          Generate
        </Button>
      </Box>
    </Grid>
  );
};

const StatusCell = (props) => {
  return (
    <Grid item xs={2}>
      <Box
        sx={{
          padding: "0.5rem",
          background: "transparent",
          border: `solid 1px ${green[500]}`,
          borderRadius: "0.25rem",
          textAlign: "center",
        }}
      >
        <Typography variant="caption">Signal status</Typography>
        <Typography variant="body1">0</Typography>
        <Box sx={{ width: "100%" }}>
          <LinearProgress variant="determinate" color="success" value={100} />
        </Box>
      </Box>
    </Grid>
  );
};

const TextCell = (props) => {
  return (
    <Grid item xs={3}>
      <Box sx={{ padding: "0px" }}>
        <Typography variant="caption">Site name</Typography>
        <Typography variant="h6">Namsan</Typography>
      </Box>
    </Grid>
  );
};

const SiteCard = (props) => {
  return (
    <Paper
      sx={{
        padding: "1rem 0.5rem",
      }}
      elevation={1}
    >
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="space-evenly"
      >
        <TextCell />
        <Divider orientation="vertical" flexItem />
        <StatusCell />
        <Divider orientation="vertical" flexItem />
        <StatusCell />
        <Divider orientation="vertical" flexItem />
        <ButtonCell />
        <Divider orientation="vertical" flexItem />
        <ButtonCell />
      </Grid>
    </Paper>
  );
};

const Home = () => {
  return (
    <div>
      <Paper
        elevation={0}
        square
        sx={{ height: "100vh", margin: "0px", paddingTop: "2rem" }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4">Overall Site Control</Typography>
          {/* NOTE Box will wrap site info-cards */}
          <Box component="div" sx={{ marginTop: "1.5rem" }}>
            <SiteCard content="hey"></SiteCard>
          </Box>
        </Container>
      </Paper>
    </div>
  );
};

export default Home;
