import React from 'react';
import Grid from '@material-ui/core/Grid';
import { HomePageCompanyLogo } from '@backstage/plugin-home';

const HomePage: React.FC<{}> = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={4}>
      <HomePageCompanyLogo />
    </Grid>
  </Grid>
);

export default HomePage;