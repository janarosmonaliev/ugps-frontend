import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  LinearProgress,
  Divider,
  Box,
} from "@mui/material";
import { red, green, grey } from "@mui/material/colors";
import { useParams } from "react-router-dom";

const StatusCell = (props) => {
  const [statusColor, setStatusColor] = useState(grey[500]);

  useEffect(() => {
    if (props.status === 0) {
      setStatusColor(red[500]);
    } else if (props.status === 1) {
      setStatusColor(green[500]);
    }
  }, [props.status]);

  return (
    <Grid item xs={1}>
      <Box
        sx={{
          padding: "0.5rem",
          background: `${statusColor}`,
          // border: `solid 1px ${statusColor}`,
          borderRadius: "0.25rem",
          textAlign: "center",
        }}
      >
        <Typography variant="caption">{props.label}</Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {props.status}
        </Typography>
      </Box>
    </Grid>
  );
};

const TextCell = (props) => {
  return (
    <Grid item>
      <Box sx={{ padding: "0px" }}>
        <Typography variant="caption" color="primary">
          {props.label}
        </Typography>
        <Typography variant="body2">{props.text}</Typography>
      </Box>
    </Grid>
  );
};

const DeviceCard = (props) => {
  const {
    site,
    deviceID,
    power,
    sdr,
    generate,
    Elapse,
    availGPS,
    availGLO,
    lat,
    lng,
    hei,
  } = props.content || {};

  return (
    <Paper
      sx={{
        padding: "0.5rem 0.5rem",
        marginBottom: "0.5rem",
      }}
      elevation={1}
    >
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="space-evenly"
      >
        <TextCell label="Site" text={site} />
        <Divider orientation="vertical" flexItem />
        <TextCell label="Device ID" text={deviceID} />
        <Divider orientation="vertical" flexItem />
        <StatusCell label="Power" status={power} />
        <Divider orientation="vertical" flexItem />
        <StatusCell label="SDR" status={sdr} />
        <Divider orientation="vertical" flexItem />
        <StatusCell label="Signal" status={generate} />
        <Divider orientation="vertical" flexItem />
        <TextCell label="Time elapsed" text={Elapse} />
        <Divider orientation="vertical" flexItem />
        <TextCell label="GPS satellites" text={availGPS} />
        <Divider orientation="vertical" flexItem />
        <TextCell label="GLONASS satellites" text={availGLO} />
        <Divider orientation="vertical" flexItem />
        <TextCell label="Latitude" text={lat} />
        <Divider orientation="vertical" flexItem />
        <TextCell label="Longtitude" text={lng} />
        <Divider orientation="vertical" flexItem />
        <TextCell label="Height" text={hei} />
      </Grid>
    </Paper>
  );
};

const DeviceWrapper = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [devices, setDevices] = useState({});

  useEffect(() => {
    fetch(
      "http://my-json-server.typicode.com/janarosmonaliev/ugps-frontend/device"
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setDevices(data);
          setIsLoaded(true);
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
    return (
      <>
        {Object.entries(devices).map((entry) => (
          <DeviceCard content={entry[1]}></DeviceCard>
        ))}
      </>
    );
  }
};

const Site = (props) => {
  const siteName = useParams().sitename;

  return (
    <div>
      <Paper
        elevation={0}
        square
        sx={{ height: "100vh", margin: "0px", paddingTop: "2rem" }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4">{siteName} Site</Typography>
          {/* NOTE Box will wrap site info-cards */}
          <Box component="div" sx={{ marginTop: "1.5rem" }}>
            <DeviceWrapper></DeviceWrapper>
          </Box>
        </Container>
      </Paper>
    </div>
  );
};
export default Site;
