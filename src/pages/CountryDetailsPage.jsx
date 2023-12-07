import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CountryDetails() {
  const [countries, setCountries] = useState(null);
  const { countryId } = useParams();

  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
      .then(response => {
        setCountries(response.data);
      });
  }, [countryId]);

  console.log('Countries Info:', countries);

  return (
    <div className='container'>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Country Details</p>
      {!countries && (
        <div className='loading'>
          <h3>Loading...</h3>
        </div>
      )}

      {countries && (
        <>
          <h1>{countries.name.common}</h1>
          <img
            className='tiny-flag'
            src={`https://flagpedia.net/data/flags/icon/72x54/${countries.alpha2Code.toLowerCase()}.png`}
            alt={countries.name.common}
          />
          <table className='table'>
            <thead></thead>
            <tbody>
              <tr>
                <td style={{ width: '30%' }}>Capital</td>
                <td>{countries.capital[0]}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>
                  {countries.area} km
                  <sup>2</sup>
                </td>
              </tr>
              <tr>
                <td>Borders</td>
                <td>
                  <ul>
                    {countries?.borders.length > 0 ? (
                      countries?.borders.map(border => {
                        return (
                          <li key={border}>
                            <Link to={`/${border}`}>{border}</Link>
                          </li>
                        );
                      })
                    ) : (
                      <li>N/A</li>
                    )}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default CountryDetails;
