import { Alert, AlertTitle, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import DashboardForm from "./DashboardForm";

function DashboardContent(props) {
  const {
    postProfile,
    error,
    profilePreview,
    profileImageChange,
    bannerImage,
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
    <Container maxWidth="md">

      <Box
        component="form"
        onSubmit={postProfile}
        noValidate
        sx={{
          borderRadius: "1.75rem",
          backgroundColor: "#E4F8FF",

          padding: "2rem",
        }}
      >
        <Typography
          variant="h4"
          color="#008CCF"
          align="center"
          marginBottom="2rem"
        >
          Profile Setup
        </Typography>

        <Typography variant="p" align="center" color="text.secondary" paragraph>
          Provide the necessary information to start finding like-minded people!
        </Typography>

        <Box sx={{ marginBottom: "1rem" }}>
          {error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}
        </Box>

        <DashboardForm
          postProfile={postProfile}
          error={error}
          fetchingLocation={fetchingLocation}
          bioUpdater={bioUpdater}
          bio={bio}
          bioLength={bioLength}
          setLocation={setLocation}
          location={location}
          picked={picked}
          setPicked={setPicked}
          profileImageChange={profileImageChange}
          profilePreview={profilePreview}
          bannerImage={bannerImage}
          bannerImageChange={bannerImageChange}
          bannerPreview={bannerPreview}
        />
      </Box>
    </Container>
  );
}

export default DashboardContent;
