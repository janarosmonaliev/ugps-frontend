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
import React, { useState, useEffect } from "react";
import { red, green, yellow, grey } from "@mui/material/colors";
import { Link } from "react-router-dom";

const ButtonCell = (props) => {
  return (
    <Grid item>
      <Box textAlign="center">
        <Typography variant="caption">Action</Typography>
        <Button
          variant="contained"
          size="medium"
          sx={{
            display: "block",
            textTransform: "none",
          }}
          color="success"
          // onClick={() => {
          //   fetch("HTTP://localhost" + props.url, {
          //     method: "PUT",
          //     mode: "cors",
          //   }).then((res) => console.log(res.json()));
          // }}
        >
          {props.text}
        </Button>
      </Box>
    </Grid>
  );
};

const StatusCell = (props) => {
  const [progress, setProgress] = useState(0);
  const [statusColor, setStatusColor] = useState(grey[500]);

  useEffect(() => {
    if (props.status === 0) {
      setProgress(1);
      setStatusColor(red[500]);
    } else if (props.status === 1) {
      setProgress(50);
      setStatusColor(yellow[500]);
    } else if (props.status === 2) {
      setProgress(100);
      setStatusColor(green[500]);
    }
  }, [props.status]);

  return (
    <Grid item xs={2}>
      <Box
        sx={{
          padding: "0.5rem",
          background: "transparent",
          border: `solid 1px ${statusColor}`,
          borderRadius: "0.25rem",
          textAlign: "center",
        }}
      >
        <Typography variant="caption">{props.label}</Typography>
        <Typography variant="body1">{props.status}</Typography>
        <Box sx={{ width: "100%", color: statusColor }}>
          <LinearProgress
            variant="determinate"
            color="inherit"
            value={progress}
          />
        </Box>
      </Box>
    </Grid>
  );
};

const TextCell = (props) => {
  return (
    <Grid item xs={3}>
      <Box sx={{ padding: "0px" }}>
        <Typography variant="caption" color="primary">
          {props.label}
        </Typography>
        <Typography variant="h6" sx={{ textDecoration: "none" }}>
          <Link to={`site/${props.siteName}`} style={{ color: "inherit" }}>
            {props.siteName}
          </Link>
        </Typography>
      </Box>
    </Grid>
  );
};

const SiteCard = (props) => {
  const { site, SignalStatus, SDRStatus, generate, reboot } =
    props.content || {};

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
        <TextCell label="Site name" siteName={site} />
        <Divider orientation="vertical" flexItem />
        <StatusCell label="Signal status" status={SignalStatus} />
        <Divider orientation="vertical" flexItem />
        <StatusCell label="SDR status" status={SDRStatus} />
        <Divider orientation="vertical" flexItem />
        <ButtonCell
          text="Generate"
          state={generate}
          url={"/generate/" + site}
        />
        <Divider orientation="vertical" flexItem />
        <ButtonCell text="Reboot" state={reboot} url={"/reboot/" + site} />
      </Grid>
    </Paper>
  );
};

const CardWrapper = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sites, setSites] = useState([]);

  useEffect(() => {
    fetch(
      "http://my-json-server.typicode.com/janarosmonaliev/ugps-frontend/site"
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setSites(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return (
      <Paper
        sx={{
          padding: "1rem",
          backgroundColor: red[500],
        }}
        elevation={1}
      >
        <Typography variant="body1">
          Oops! There was an error: {error.message}
        </Typography>
      </Paper>
    );
  } else if (!isLoaded) {
    return <LinearProgress />;
  } else {
    return <SiteCard content={sites.NAMSAN}></SiteCard>;
  }
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
            <CardWrapper />
          </Box>
        </Container>
      </Paper>
    </div>
  );
};

export default Home;
