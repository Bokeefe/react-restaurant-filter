import React from "react";
import Grid from "@material-ui/core/Grid";
import RestaurantCard from "../restaurant-card/restaurant-card";

class RestaurantList extends React.Component {
  render() {
    return (
      <div>
        <Grid container spacing={3}>
          {this.props.list.map((rest, index) => {
            return (
              <Grid item md={3} key={index}>
                <RestaurantCard restaurant={rest} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default RestaurantList;
