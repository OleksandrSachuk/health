import { of } from 'rxjs';
import { delay, repeat, concatMap } from 'rxjs/operators';
import { compose, lifecycle, withHandlers, withState } from 'recompose';
import random from 'lodash/random';

import Dashboard from './Dashboard';

export default compose(
  withState('temperature', 'setTemperature', 0),
  withState('airPressure', 'setAirPressure', 0),
  withState('humidity', 'setHumidity', 0),

  withHandlers({

    setTimerValue: ({ setTimer }) => (value) => {
      setTimer(value);
    },

  }),

  lifecycle({

    componentDidMount() {
      const randomData = ({ min, max, float, decimal }) => Math.round(random(min, max, float) * decimal) / decimal;

      const randomTemperatureData = {
        min: 36,
        max: 37,
        float: true,
        decimal: 10,
      };

      const randomAirPresureData = {
        min: 740,
        max: 750,
        float: false,
        decimal: 1000,
      };

      const randomHumidityData = {
        min: 40,
        max: 60,
        float: false,
        decimal: 100,
      };

      const {
        setTemperature,
        setAirPressure,
        setHumidity,
      } = this.props;

      const randomDelay = (bottom, top) => {
        return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
      };

      this.temperature$ = of(randomData(randomTemperatureData))
        .pipe(
          concatMap(() => of(randomData(randomTemperatureData))
            .pipe(
              delay(randomDelay(100, 200)),
            ),
          ),
          repeat(),
        )
        .subscribe(setTemperature);

      this.airPresure$ = of(randomData(randomAirPresureData))
        .pipe(
          concatMap(() => of(randomData(randomAirPresureData))
            .pipe(
              delay(randomDelay(100, 200)),
            ),
          ),
          repeat(),
        )
        .subscribe(setAirPressure);

      this.humidity$ = of(randomData(randomHumidityData))
        .pipe(
          concatMap(() => of(randomData(randomHumidityData))
            .pipe(
              delay(randomDelay(100, 200)),
            ),
          ),
          repeat(),
        )
        .subscribe(setHumidity);


    },

    componentWillUnmount() {
      this.temperature$.unsubscribe();
    },

  }),
)(Dashboard);

