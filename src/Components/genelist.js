import React from "react";
import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "./simplecard";
import Search from "./search";

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
          searchFor={() => this.props.searchFor("gene")}
          type="gene"
        />
        <Grid container spacing={24}>
          {this.props.searchResults
            ? this.props.searchResults.map(gene => {
                return (
                  <Grid item xs={6} sm={3}>
                    <Paper className={this.props.paper}>
                      <SimpleCard
                        name={gene.title ? gene.title : gene.name}
                        bgImage={
                          gene._links.thumbnail
                            ? gene._links.thumbnail.href
                            : ""
                        }
                        description="" // {gene.description.slice(0, 70) + "..."}
                        detailsView={this.modal}
                        id={gene._links.self.href}
                        type="gene"
                        favoriteClick={()=>this.props.favoriteClick(gene)}
                        item={gene}
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
