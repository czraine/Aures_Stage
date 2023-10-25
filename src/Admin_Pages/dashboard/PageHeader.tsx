import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function PageHeader() {

  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"

        />
      </Grid>
      <Grid item>
        <Typography
          variant="h3"
          component="h3"
          gutterBottom
          style={{ color: 'blue' }}
        >
        </Typography>
        <Typography variant="subtitle2">
          Conrôle et suivi de votre chiffre d'affaires 💲
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
