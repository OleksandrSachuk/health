import { Observable, range } from 'rxjs';
import { compose, lifecycle, withHandlers, withState } from 'recompose';
import noop from 'lodash/noop';

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
      const {
        setTemperature,
        setAirPressure,
        setHumidity,
      } = this.props;

      const randomDelay = (bottom, top) => {
        return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
      };

      this.temperature$ = range(36, 37)
        .subscribe({
          next: (value) => {
            console.log('value', value);
          },
          error: () => noop,
          complete: () => noop,
        });
    },

    componentWillUnmount() {
      this.temperature$.unsubscribe();
    },

  }),
)(Dashboard);

