import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const propTypes = {
  airPressure: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
  ]),
  humidity: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
  ]),
  temperature: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
  ]),
};

const defaultProps = {};

const styles = theme => ({
  root: {
    width: '50%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  tableCellCenter: {
    textAlign: 'center',
  },
});

const Dashboard = ({
                     airPressure,
                     humidity,
                     temperature,
                     classes,
                   }) => {
  const data = [
    { name: 'Temperature', value: temperature, description: '°C' },
    { name: 'Air pressure', value: airPressure, description: 'mmHg' },
    { name: 'Humidity', value: humidity, description: '%' },
  ];

  return (
    <Table className={ classes.table }>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell className={ classes.tableCellCenter }>Value</TableCell>
          <TableCell className={ classes.tableCellCenter }>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { data.map((row) => {
          return (
            <TableRow key={ row.name }>
              <TableCell component="th" scope="row">
                { row.name }
              </TableCell>
              <TableCell numeric className={ classes.tableCellCenter }>{ row.value }</TableCell>
              <TableCell className={ classes.tableCellCenter }>{ row.description }</TableCell>
            </TableRow>
          );
        }) }
      </TableBody>
    </Table>
  );
};

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;

export default withStyles(styles)(Dashboard);