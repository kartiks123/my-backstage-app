import React from 'react';
import { makeStyles, Grid, Paper, Typography } from '@material-ui/core';
import {
  HomePageCompanyLogo,
  HomePageToolkit,
  HomePageStarredEntities,
} from '@backstage/plugin-home';
import { HomePageSearchBar } from '@backstage/plugin-search';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f0f0f0', // Light gray color for background
    minHeight: '100vh',
    padding: theme.spacing(4),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: theme.spacing(4),
    backgroundColor: '#f0f0f0', // Light gray color for container
    border: `2px solid ${theme.palette.secondary.main}`, // Color matched with blue sidebar color
    borderRadius: theme.spacing(1),
  },
  title: {
    color: '#333333', // Dark gray color for text
    marginBottom: theme.spacing(4),
  },
  searchBarContainer: {
    marginBottom: theme.spacing(4),
    backgroundColor: '#f9f9f9', // Lighter gray color for search bar
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    width: '95%', // Increased length of search bar
  },
  gridItem: {
    backgroundColor: '#f0f0f0', // Light gray color for grid item
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} className={classes.gridItem}>
        <HomePageCompanyLogo />
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <Paper className={classes.container}>
          <Typography variant="h4" className={classes.title}>
            Search Page
          </Typography>
          <Paper className={classes.searchBarContainer}>
            <HomePageSearchBar placeholder="Search" />
          </Paper>
          <Paper className={classes.searchBarContainer}>
            <HomePageStarredEntities />
          </Paper>
          <Paper className={classes.searchBarContainer}>
            <HomePageToolkit
              tools={Array(8).fill({
                url: '#',
                label: 'link',
              })}
            />
          </Paper>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default HomePage;