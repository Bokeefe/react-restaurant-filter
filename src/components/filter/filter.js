import React from "react";
import "./filter.scss";
import { states } from "../../constants/constants";

import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Pagination from "@material-ui/lab/Pagination";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allGenres: [],
      filteredData: this.props.rawList,
      filterSortKey: "name",
      filterState: "all",
      filterGenre: "all",
      noStateMatches: false,
      pageSet: [],
      page: 1,
    };
  }

  // lifesycle
  componentDidMount() {
    // all the possible genres were not listed in the reqs,
    // I'd like to do this more efficiently but it works
    let genreArr = [];
    this.props.rawList.forEach((item) => {
      item.genre.split(",").forEach((genre) => {
        if (genreArr.indexOf(genre) === -1) {
          genreArr.push(genre);
        }
      });
    });

    this.setState({ allGenres: genreArr.sort() });
    this.filterAll();
  }

  // methods alphabetical
  compare = (a, b) => {
    if (a[this.state.filterSortKey] < b[this.state.filterSortKey]) {
      return -1;
    }
    if (a[this.state.filterSortKey] > b[this.state.filterSortKey]) {
      return 1;
    }
    return 0;
  };

  filterAll() {
    let filteredPool = [...this.props.rawList];
    filteredPool = this.filterByKey("name", filteredPool);
    filteredPool = this.filterByGenre(filteredPool);
    filteredPool = this.filterByState(filteredPool);
    const pageSet = this.paginate(filteredPool);

    this.setState({ filteredData: filteredPool, pageSet: pageSet }, () => {
      this.props.onUpdateFilter(pageSet);
    });
  }

  filterByGenre(filteredPool) {
    const filteredGenres =
      this.state.filterGenre === "all"
        ? filteredPool
        : filteredPool.filter((item) => {
            return (
              item.genre
                .toLowerCase()
                .indexOf(this.state.filterGenre.toLowerCase()) > -1
            );
          });
    return filteredGenres;
  }

  filterByKey(keyName, list) {
    return list.sort(this.compare);
  }

  filterByState(filteredPool) {
    const filteredStates = filteredPool.filter((item) => {
      return item.state.toLowerCase() === this.state.filterState.toLowerCase();
    });

    this.setState(
      {
        noStateMatches:
          filteredStates.length === 0 && this.state.filterState !== "all",
      },
      () => {}
    );
    return this.state.filterState === "all" ? filteredPool : filteredStates;
  }

  handleGenreFilter = (e) => {
    this.setState({ filterGenre: e.target.value }, () => {
      this.filterAll();
    });
  };

  handleNewSearch = (e) => {
    const filterPool = [...this.state.filteredData];

    if (e.target.value === "") {
      this.props.onUpdateFilter(filterPool);
    }

    if (e.key === "Enter") {
      const searchTerm = e.target.value.toLowerCase();
      const searchableFields = ["name", "city", "genre"];

      let matches = filterPool.filter((item) => {
        for (var key in searchableFields) {
          if (
            item[searchableFields[key]].toLowerCase().indexOf(searchTerm) > -1
          ) {
            return item;
          }
        }
        return false;
      });

      this.props.onUpdateFilter(matches);
    }
  };

  handleSortFilter = (e) => {
    this.setState({ filterSortKey: e.target.value }, () => {});
  };

  handleStateFilter = (e) => {
    this.setState({ filterState: e.target.value }, () => {
      this.filterAll();
    });
  };

  handlePagination = (event, value) => {
    this.setState({ page: value }, () => {
      this.filterAll();
    });
  };

  paginate = (list) => {
    return list.length > 10
      ? list.slice(this.state.page * 10 - 10, this.state.page * 10)
      : list;
  };

  render() {
    return (
      <div className="rl-c-filter-container">
        <form
          className="rl-l-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <FormControl style={{ margin: "1rem" }}>
            <TextField
              id="standard-basic"
              label="Search"
              onKeyUp={this.handleNewSearch}
            />
          </FormControl>
          <FormControl style={{ margin: "1rem" }}>
            <InputLabel id="demo-simple-select-outlined-label">
              State
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={this.handleStateFilter}
              value={this.state.filterState}
            >
              <MenuItem value="all" key="0">
                <em>All States</em>
              </MenuItem>
              {states.map((state, index) => (
                <MenuItem value={state} key={index + 1}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl style={{ margin: "1rem" }}>
            <InputLabel id="demo-simple-select-outlined-label">
              Genre
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={this.handleGenreFilter}
              value={this.state.filterGenre}
            >
              <MenuItem value="all" key="0">
                <em>All Genres</em>
              </MenuItem>
              {this.state.allGenres.map((genre, index) => {
                return (
                  <MenuItem value={genre} key={index + 1}>
                    {genre}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl style={{ margin: "1rem", float: "right" }}>
            <Pagination
              count={Math.ceil(this.state.filteredData.length / 10)}
              page={this.state.page}
              onChange={this.handlePagination}
            />
          </FormControl>
          {this.state.noStateMatches ? (
            <InputLabel htmlFor="standard-adornment-amount">
              No restaurant matches in that state
            </InputLabel>
          ) : (
            ""
          )}
        </form>
      </div>
    );
  }
}

export default Filter;
