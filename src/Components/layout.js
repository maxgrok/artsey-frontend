import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "./simplecard";
import Search from "./search";
import { impressionism } from "../lib/impressionism";
import { artists } from "../lib/impressionism-artists";
import { edgarDegasArtworks } from "../lib/edgar-degas-artworks";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

function FullWidthGrid(props) {
  const { classes } = props;

  function createGeneCards() {
    let genes = [];
    for (let i = 0; i < 4; i++) {
      genes.push(impressionism);
    }

    return genes;
  }

  return (
    <div className={classes.root}>
      <Search />
      <Grid container spacing={24}>
<<<<<<< HEAD
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
=======
        {createGeneCards().map(gene => {
          return (
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>
                <SimpleCard
                  name={impressionism.name}
                  bgImage={impressionism._links.thumbnail.href}
                  description={impressionism.description.slice(0, 70) + "..."}
                />
              </Paper>
            </Grid>
          );
        })}
>>>>>>> 21236e904277ed249db7b815e5eb012c42e44a98
      </Grid>
      <div>Artists</div>
      <Grid container spacing={24}>
        {artists._embedded.artists.map(artist => {
          return (
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>
                <SimpleCard
                  name={artist.name}
                  bgImage={artist._links.thumbnail.href}
                  description={artist.hometown}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <div>Artworks</div>
      <Grid container spacing={24}>
        {edgarDegasArtworks._embedded.artworks.map(artwork => {
          return (
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>
                <SimpleCard
                  name={artwork.title}
                  bgImage={
                    artwork._links.thumbnail
                      ? artwork._links.thumbnail.href
                      : ""
                  }
                  description={artwork.category}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

FullWidthGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullWidthGrid);
