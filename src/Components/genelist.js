const geneList =(props) =>{
 return(
  <h1>Periods</h1>
      <Search
          searchTerm={this.props.searchTerm}
          setSearchTerm={this.props.setSearchTerm}
          searchFor={this.props.searchFor}
        />
        <Grid container spacing={24}>
          {this.props.searchResults.gene
            ? this.props.searchResults.gene._embedded.genes.map(gene => {
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
        );
}