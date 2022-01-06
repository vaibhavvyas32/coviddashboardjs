import React from "react";
import "./Table.css";
import CountUp from "react-countup";

function Table({ countries }) {
  return (
    <>
      <div className="table">
        {countries.map(({ country, cases }) => (
          <tr>
            <td>{country}</td>
            <td>
              <strong>
                <CountUp start={0} end={cases} duration={2.75} separator="," />
              </strong>
            </td>
          </tr>
        ))}
      </div>
    </>
  );
}

export default Table;
