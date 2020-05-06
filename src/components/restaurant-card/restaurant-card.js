import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";

export default function ResaurantCard(props) {
  return (
    <div>
      <Card className="restaurant-card-container">
        <CardContent>
          <h3>{props.restaurant.name}</h3>
          <div>
            <b>
              {props.restaurant.city}, {props.restaurant.state}
            </b>
            <p>{props.restaurant.telephone}</p>
          </div>
          <div>
            {parseGenres(props.restaurant.genre).map((genre, index) => {
              return (
                <Chip key={index} label={genre} style={{ margin: ".25rem" }} />
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const parseGenres = (genres) => {
  if (genres) {
    return genres.split(",").map((genre) => {
      return genre;
    });
  }
  return null;
};
