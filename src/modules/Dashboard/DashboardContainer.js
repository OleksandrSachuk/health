import { of, combineLatest } from 'rxjs';
import { delay, repeat, concatMap, timeInterval } from 'rxjs/operators';
import { compose, lifecycle, withState } from 'recompose';
import random from 'lodash/random';

import Dashboard from './Dashboard';

export default compose(
  withState('temperature', 'setTemperature', 0),
  withState('airPressure', 'setAirPressure', 0),
  withState('humidity', 'setHumidity', 0),

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

      const randomDelay = (bottom, top) => Math.floor(Math.random() * (1 + top - bottom)) + bottom;

      this.temperature$ = of(randomData(randomTemperatureData))
        .pipe(
          concatMap(() => of(randomData(randomTemperatureData))
            .pipe(
              delay(randomDelay(100, 1500)),
            ),
          ),
          repeat(),
          timeInterval(),
        );

      this.airPresure$ = of(randomData(randomAirPresureData))
        .pipe(
          concatMap(() => of(randomData(randomAirPresureData))
            .pipe(
              delay(randomDelay(100, 200)),
            ),
          ),
          repeat(),
          timeInterval(),
        );

      this.humidity$ = of(randomData(randomHumidityData))
        .pipe(
          concatMap(() => of(randomData(randomHumidityData))
            .pipe(
              delay(randomDelay(100, 200)),
            ),
          ),
          repeat(),
          timeInterval(),
        );

      this.summary$ = combineLatest(this.temperature$, this.airPresure$, this.humidity$)
        .subscribe(([temperature, airPresure, humidity]) => {

          const missedValue = 'N/A';

          const { value: temperatureValue, interval: temperatureInterval } = temperature;
          temperatureInterval < 1000 ? setTemperature(temperatureValue) : setTemperature(missedValue);

          const { value: airPresureValue, interval: airPresureInterval } = airPresure;
          airPresureInterval < 1000 ? setAirPressure(airPresureValue) : setAirPressure(missedValue);

          const { value: humidityValue, interval: humidityInterval } = humidity;
          humidityInterval < 1000 ? setHumidity(humidityValue) : setHumidity(missedValue);

        });
    },

    componentWillUnmount() {
      this.summary$.unsubscribe();
    },

  }),
)(Dashboard);

// , (a,b,c)=> console.log('a,b,c', a,b,c)