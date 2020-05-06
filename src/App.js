import React from "react";
import RestaurantList from "./components/restaurant-list/restaurant-list";
import Container from "@material-ui/core/Container";
import { dummy } from "./components/restaurant-list/dummy-list";
import { apiURL, apiKey } from "./constants/env";
import Filter from "./components/filter/filter";
import Loader from "./core/loader/loader";
import "./global.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onUpdateFilter.bind(this);
    this.state = { rawList: dummy, filteredList: null, isLoaded: false };
  }

  componentDidMount() {
    fetch(apiURL, {
      headers: {
        Authorization: apiKey,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            rawList: result,
          });
        },
        (error) => {
          console.log(error);
          this.setState({
            isLoaded: true,
          });
        }
      );
  }

  onUpdateFilter = (updatedList) => {
    this.setState({ filteredList: updatedList });
  };

  render() {
    return this.state.isLoaded ? (
      <div className="app-container">
        <Filter
          rawList={this.state.rawList}
          onUpdateFilter={this.onUpdateFilter}
        />
        <Container maxWidth="lg">
          <div style={{ marginTop: "8rem" }}>
            <RestaurantList
              list={
                this.state.filteredList
                  ? this.state.filteredList
                  : this.state.rawList
              }
            />
          </div>
        </Container>
      </div>
    ) : (
      <Loader />
    );
  }
}

export default App;
