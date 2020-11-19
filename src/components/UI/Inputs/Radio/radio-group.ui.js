import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MIN_TOUCHABLE} from 'constants';
import {Wrapper, RadioOpacity, RadioText} from './styles';

class RadioGroup extends Component {
  state = {
    options: [],
  };

  componentDidMount() {
    this.setAndCheckOptions();
  }

  setAndCheckOptions = () => {
    const {options} = this.props;

    const idx = options.findIndex(({active}) => active);
    options.forEach((option) => (option.active = false));
    options[Math.max(idx, 0)].active = true;
    this.setState({options});
  };

  setActiveOption = (name) => {
    const {options} = this.state;
    const {setGames} = this.props;

    const newInactive = options.findIndex(({active}) => active);
    const newActive = options.findIndex((option) => option.name === name);

    options[newInactive].active = false;
    options[newActive].active = true;

    setGames(options[newActive].value);
    this.setState({options});
  };

  renderButton = (name, active, idx) => {
    const {btnRadius = MIN_TOUCHABLE} = this.props;

    return (
      <RadioOpacity
        key={`${name}_${idx}`}
        active={active}
        radius={btnRadius}
        onPress={active ? null : () => this.setActiveOption(name)}>
        <RadioText active={active}>{name}</RadioText>
      </RadioOpacity>
    );
  };

  render() {
    return (
      <Wrapper>
        {this.state.options.map(({name, active}, i) =>
          this.renderButton(name, active, i),
        )}
      </Wrapper>
    );
  }
}

RadioGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      active: PropTypes.bool,
    }),
  ).isRequired,
  setGames: PropTypes.func.isRequired,
  btnRadius: PropTypes.string,
};

export default RadioGroup;
