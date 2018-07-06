import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SimpleCard from './simplecard';
import Search from './search';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function FullWidthGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
    <Search />
      <Grid container spacing={24}>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}><geneCard /></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}><SimpleCard name={props.name} period={props.period}/></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}><SimpleCard name={props.name} period={props.period}/></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}><SimpleCard name={props.name} period={props.period}/></Paper>
        </Grid>
      </Grid>
      <Grid container spacing={24}>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}><SimpleCard name={props.name} period={props.period}/></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}><SimpleCard name={props.name} period={props.period}/></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}><SimpleCard name={props.name} period={props.period}/></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}><SimpleCard name={props.name} period={props.period}/></Paper>
        </Grid>
      </Grid>
      <Grid container spacing={24}>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}><SimpleCard name={props.name} period={props.period}/></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}><SimpleCard name={props.name} period={props.period}/></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}><SimpleCard name={props.name} period={props.period}/></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}><SimpleCard name={props.name} period={props.period}/></Paper>
        </Grid>
      </Grid>
    </div>
  );
}

FullWidthGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullWidthGrid);