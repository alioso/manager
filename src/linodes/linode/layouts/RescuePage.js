import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setTitle } from '~/actions';
import { setSource } from '~/actions/source';
import api from '~/api';
import { getObjectByLabelLazily } from '~/api/util';

import { RescueMode, ResetRootPassword } from '../components';
import { selectLinode } from '../utilities';


export class RescuePage extends Component {
  static async preload({ dispatch, getState }, { linodeLabel }) {
    const { id } = await dispatch(getObjectByLabelLazily('linodes', linodeLabel));
    await Promise.all([
      api.linodes.disks,
      api.linodes.volumes,
    ].map(o => dispatch(o.all([id]))));
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setSource(__filename));
  }

  componentWillMount() {
    const { dispatch, linode } = this.props;
    dispatch(setTitle(`Rescue - ${linode.label}`));
  }

  render() {
    const { dispatch, linode } = this.props;

    return (
      <div className="row">
        <section className="col-lg-6 col-md-12 col-sm-12">
          <RescueMode dispatch={dispatch} linode={linode} />
        </section>
        <section className="col-lg-6 col-md-12 col-sm-12">
          <ResetRootPassword dispatch={dispatch} linode={linode} />
        </section>
      </div>
    );
  }
}

RescuePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  linode: PropTypes.object.isRequired,
};

export default connect(selectLinode)(RescuePage);
