import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  airPressure: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  temperature: PropTypes.number.isRequired,
};

const defaultProps = {};

const Dashboard = ({
                     airPressure,
                     humidity,
                     temperature,
                   }) =>
  (
    <div>
      <div>
        Temperature: { temperature } °C
      </div>
      <div>
        Air pressure: { airPressure } mmHg
      </div>
      <div>
        Humidity: { humidity } %
      </div>
    </div>
  );

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;

export default Dashboard;
