import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, MenuItem, Select } from "@material-ui/core";

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

  return (
    <>
      <div className="app">
        <h1>Covid-19 Dashboard</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value={country} onChange={setCountry}>
            {/* This is for Worldwide Option so we can display global data at once */}
            <MenuItem value="worldwide">WorldWide</MenuItem>
            {/* This is the loop for displaying all the countries using map. */}
            {countries.map((country) => {
              return <MenuItem value={country.value}>{country.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default App;
