import React, { useState, useEffect } from "react";
import "./App.css";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import InfoBox from "./Components/InfoBox";

const App = () => {
  const [countries, setCountries] = useState([]); //This state is being used in Dropmenu
  const [country, setCountry] = useState("worldwide");

  // This gets called once the webpage loads.
  useEffect(() => {
    // This is being used for the getting the countries in the dropmenu.
    const getCountriesData = async () => {
      fetch(`https://disease.sh/v3/covid-19/countries`)
        .then((response) => response.json())
        .then((data) => {
          // Mapping through countries as per API and getting countryName & value of that country as per API.
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          setCountries(countries);
        });
    };
    // Calling the function
    getCountriesData();

    // Here we used [] because we don't want it to run it forever. When we put some value here then it runs once page loads as well as when the value after , is given.
  }, []);

  const onCountryChange = async (e) => {
    // Here we are taking event value which we get from the MenuItem and setting it in countryCode variable. This creates a functionality like when we select a particular country in dropmenu , the value changes to that country.
    const countryCode = e.target.value;

    setCountry(countryCode);
  };

  return (
    <>
      <div className="app">
        <div className="app__left">
          <div className="app__header">
            <h1>Covid-19 Dashboard</h1>
            {/* -----DROP MENU----- */}
            <FormControl className="app_dropdown">
              <Select
                variant="outlined"
                value={country}
                onChange={onCountryChange}
              >
                {/* This is for Worldwide Option so we can display global data at once */}
                <MenuItem value="worldwide">WorldWide</MenuItem>
                {/* This is the loop for displaying all the countries using map. */}
                {countries.map((country) => {
                  return (
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {/* -----DROP MENU ENDS----- */}
          </div>

          {/* -----COVID STAT CARDS----- */}
          {/* This displays Covid Stat Cards */}
          <div className="app__stats">
            <InfoBox title="Covid Cases" total={303030} />
            <InfoBox title="Recovered" total={303030} />
            <InfoBox title="Deaths" total={303030} />
          </div>
        </div>
        <Card className="app__right">
          <CardContent>
            <Typography color="textSecondary">hello hi hi ihiweh</Typography>
            <Typography>Total</Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default App;
