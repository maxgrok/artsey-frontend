import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "./simplecard";
import Search from "./search";

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

export default class GeneList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1>Periods</h1>
        <Search
          searchTerm={this.props.searchTerm}
          setSearchTerm={this.props.setSearchTerm}
          searchFor={this.props.searchFor}
        />
        <Grid container spacing={24}>
<<<<<<< HEAD
          {this.props.searchResults.gene
            ? this.props.searchResults.gene._embedded.genes.map(gene => {
=======
          {this.props.searchResults
            ? this.props.searchResults._embedded.genes.map(gene => {
>>>>>>> aa53934a4c285760d2659df13fb9612dd03df200
                return (
                  <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>
                      <SimpleCard
                        name={gene.name}
                        bgImage={
                          gene._links.thumbnail
                            ? gene._links.thumbnail.href
                            : ""
                        }
                        description={gene.description.slice(0, 70) + "..."}
                        detailsView={this.modal}
                        id={gene.id}
                        type="gene"
                        favoriteClick={this.favoriteClick}
                      />
                    </Paper>
                  </Grid>
                );
              })
            : ""}
        </Grid>
      </div>
    );
  }
}

GeneList.propTypes = {
  classes: PropTypes.object.isRequired
};
