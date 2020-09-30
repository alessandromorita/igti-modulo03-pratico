import React, { Component } from 'react';
import { formatNumber } from '../helpers/formatHelpers';

export default class ReadOnlyInputINSS extends Component {
  render() {
    const { description, value, percent, color } = this.props;
    return (
      <div>
        <label>
          <span>{description} </span>
          <input
            style={{ color: color }}
            type="text"
            readOnly
            disabled
            value={formatNumber(value) + ' (' + percent + '%)'}
          />
        </label>
      </div>
    );
  }
}
