const artworkList =(props) =>{
<h1 style={{ textAlign: "center" }}>Artworks</h1>
        <Search
          searchTerm={this.props.searchTerm}
          setSearchTerm={this.props.setSearchTerm}
          searchFor={this.props.searchFor}
        />
        <Grid container spacing={24}>
          {this.state.searchResults.artwork
            ? this.state.searchResults.artwork._embedded.artworks.map(
                artwork => {
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
                          detailsView={this.modal}
                          id={artwork.id}
                          type="artwork"
                          favoriteClick={this.favoriteClick(artwork.id)}

                        />
                      </Paper>
                    </Grid>
                  );
                }
              )
            : ""}
        </Grid>
      }