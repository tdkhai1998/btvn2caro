import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ResetUrlBack } from '../../Redux';

const MyRedirect = props => {
  const { urlBack, reset } = props;
  console.log('urlBack', urlBack);
  if (urlBack) {
    reset();
    return <Redirect to={urlBack} />;
  }
  return null;
};

const mapStateToProps = state => ({
  urlBack: state.urlBack
});
const mapDispatchToProps = dispatch => ({
  reset: () => dispatch(ResetUrlBack())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyRedirect);
