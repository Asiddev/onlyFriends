import React from 'react';
import {
  Button,
  FormControl,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import ItemList from "../ItemList";
import Autocomplete from "react-google-autocomplete";

function DashboardForm(props) {
  const {
    profilePreview,
    profileImageChange,
    bio,
    bioUpdater,
    bioLength,
    fetchingLocation,
    picked,
    setPicked,
    bannerImageChange,
    bannerPreview,
    location,
    setLocation,
  } = props;

  return (
    <Box
      sx={{
        // border: "3px dashed orange",
        display: "flex column",
      }}
    >
      {/* row 1 of 6 - upload profile pic */}
      <Box
        sx={{
          // border: "3px solid green",
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          marginBottom: "1rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "right",
            // border: "3px solid blue",
            alignItems: "right",
            width: "12rem",
          }}
        >
          <Typography variant="p">Upload a profile image</Typography>
          <br />
          <Typography variant="p" fontWeight="italic">
            (e.g. a self-portrait)
          </Typography>
        </Box>
        <Box
          sx={{
            // border: "3px dashed red",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            width: "20rem",
          }}
        >
          <Box
            className="circle-img"
            component="img"
            sx={{
              width: "100px",
              height: "100px",
              borderRadius: "100%",
              objectFit: "cover",
            }}
            alt="Profile pic"
            src={profilePreview}
          />
          <Button variant="contained" component="label" color="secondary">
            Upload
            <input
              type="file"
              accept="image/*"
              name="profile_picture"
              onChange={profileImageChange}
              hidden
            />
          </Button>
        </Box>
      </Box>

      {/* row 2 of 6 - bio */}
      <Box
        sx={{
          // border: "3px solid green",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "2rem",
          marginBottom: "1rem",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "right",
            // border: "3px solid blue",
            alignItems: "right",
            width: "12rem",
          }}
        >
          <Typography variant="p">Bio</Typography>
          <br />
          <Typography variant="p" fontWeight="italic">
            (max 100 characters)
          </Typography>
        </Box>
        <Box
          sx={{
            // border: "3px dashed red",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            width: "20rem",
          }}
        >
          <TextField
            style={{
              width: "250px",
              height: "auto",
            }}
            multiline={true}
            minRows={2}
            name="Bio"
            value={bio}
            onChange={bioUpdater}
            placeholder="e.g. I love long walks to the fridge"
          ></TextField>
          <Typography
            className={bioLength >= 0 ? "safe" : "danger"}
            variant="h6"
          >
            {bioLength}
          </Typography>
        </Box>
      </Box>

      {/* row 3 of 6 - location */}
      <Box
        sx={{
          // border: "3px solid green",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "2rem",
          marginBottom: "1rem",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "right",
            // border: "3px solid blue",
            alignItems: "right",
            width: "12rem",
          }}
        >
          <Typography variant="p">Set your location</Typography>
          <br />
          <Typography variant="p" fontWeight="italic">
            (e.g. Vancouver, B.C.)
          </Typography>
        </Box>
        <Box
          sx={{
            // border: "3px dashed red",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            width: "20rem",
          }}
        >
          <Autocomplete
            name="Location"
            placeholder={
              fetchingLocation ? "Fetching Location..." : "Location here"
            }
            apiKey={process.env.REACT_APP_MY_API_KEY}
            style={{
              width: "350px",
              height: "55px",
              backgroundColor: "#E4F8FF",
              border: "1px solid #AFBFC4",
              borderRadius: "0.3rem",
            }}
            onPlaceSelected={(place) => {
              setLocation(place["formatted_address"]);
            }}
            options={{
              types: ["(regions)"],
              componentRestrictions: { country: "ca" },
            }}
            defaultValue={location}
          />
        </Box>
      </Box>

      {/* row 4 of 6 - upload banner */}
      <Box
        sx={{
          // border: "3px solid green",
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          marginBottom: "1rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "right",
            // border: "3px solid blue",
            alignItems: "right",
            width: "12rem",
          }}
        >
          <Typography variant="p">Upload a cover banner</Typography>
          <br />
          <Typography variant="p" fontWeight="italic">
            (e.g. an "action shot")
          </Typography>
        </Box>
        <Box
          sx={{
            // border: "3px dashed red",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            width: "20rem",
          }}
        >
          <Box
            className="rectangle-img"
            component="img"
            sx={{ width: "304px", height: "171px", objectFit: "cover" }}
            alt="Cover banner"
            src={bannerPreview}
          />
          <Button variant="contained" component="label" color="secondary">
            Upload
            <input
              type="file"
              accept="image/*"
              name="banner_picture"
              onChange={bannerImageChange}
              hidden
            />
          </Button>
        </Box>
      </Box>

      {/* row 5 of 6 - select interests*/}
      <Box
        sx={{
          // border: '3px dashed blue',
          marginBottom: "1rem",
          display: "flex",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="p">
            Select at least one interest that applies to you
          </Typography>
          <Box
            sx={{
              lineHeight: "2.8rem",
            }}
          >
            <FormControl>
              <ItemList picked={picked} setPicked={setPicked} />
            </FormControl>
          </Box>
        </Box>
      </Box>

      {/* row 6 of 6 - save button */}
      <Box
        sx={{
          // border: '3px solid red',
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" type="submit" color="secondary">
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default DashboardForm;