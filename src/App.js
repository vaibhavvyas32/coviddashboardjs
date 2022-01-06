import React, { useState, useEffect } from "react";
import "./App.css";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import InfoBox from "./Components/InfoBox";
import Table from "./Components/Table";
import Login from "./Components/Login";
import { auth } from "./Firebase/firebase";
import { signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [countries, setCountries] = useState([]); //This state is being used in Dropmenu
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({}); //Getting Country Infomation as per dropmenu selection
  const [tableData, setTableData] = useState([]);
  const [isGuest, setIsGuest] = useState(true);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  // Used for fetching default value for worldwide when page loads. Reason: Dropmenu only reacts when we select a value,
  // not for default. So to display worldwide value by default we use this useEffect.
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

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
            flag: country.countryInfo.flag,
          }));
          setTableData(data);
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

    // https://disease.sh/v3/covid-19/all for worldwide
    // https://disease.sh/v3/covid-19/countries/{country} for country specific

    //To decide whether we want to set url for worldwide or country specific
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url).then((response) =>
      response.json().then((data) => {
        setCountry(countryCode);
        //All data of country.
        setCountryInfo(data);
      })
    );
  };

  const signOutWithGoogle = () => {
    signOut(auth)
      .then(() => {
        setIsUserSignedIn(false);
        toast("Logged Out!");
      })
      .catch((err) => {
        console.log("error occured while logging out", err);
      });
  };

  const loginAsGuest = () => {
    if (isGuest) {
      setIsUserSignedIn(true);
      toast("Logged In!");
      setIsGuest(true);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsUserSignedIn(true);
        toast("Logged In!");
      }
    });
  }, []);

  //Login Auth
  if (isUserSignedIn) {
    return (
      <>
        <div className="app">
          <div className="app__left">
            <div className="app__header">
              <h1>COVID-19 DASHBOARD</h1>
              <ToastContainer />
              {/* -----DROP MENU----- */}
              <FormControl className="app__dropdown">
                <Select
                  variant="outlined"
                  value={country}
                  onChange={onCountryChange}
                >
                  {/* This is for Worldwide Option so we can display global data at once */}
                  <MenuItem value="worldwide">World Wide</MenuItem>
                  {/* This is the loop for displaying all the countries using map. */}
                  {countries.map((country) => {
                    return (
                      <MenuItem value={country.value}>
                        <span className="dropdown__items">
                          <span className="dropdown__img">
                            <img
                              src={country.flag}
                              alt=""
                              className="country__flag"
                            />
                          </span>
                          <p>{country.name}</p>
                        </span>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {/* -----DROP MENU ENDS----- */}
            </div>

            {/* -----COVID STAT CARDS----- */}
            {/* This displays Covid Stat Cards */}
            <div className="app__stats">
              <InfoBox
                title="COVID-19 Cases"
                cases={countryInfo.active}
                todayCases={countryInfo.todayCases}
                total={countryInfo.cases}
                className="infoBox"
              />
              <InfoBox
                title="Recovered"
                todayCases={countryInfo.todayRecovered}
                total={countryInfo.recovered}
                className="recovered"
              />
              <InfoBox
                title="Deaths"
                todayCases={countryInfo.todayDeaths}
                total={countryInfo.deaths}
                className="deaths"
              />
            </div>
          </div>
          <div className="app__right">
            <Button className="btn-logout" onClick={signOutWithGoogle}>
              Log Out{" "}
            </Button>
            <Card>
              <CardContent>
                <h3> Live Cases CountryWise </h3>
                <Table countries={tableData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Login />

        <Button className="login-as-guest" onClick={loginAsGuest}>
          Continue as Guest
        </Button>
      </>
    );
  }
};

export default App;
