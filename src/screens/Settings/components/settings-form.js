import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Slider from '@react-native-community/slider';
import {RadioGroup, DefaultButton, DefaultForm} from 'components/UI';
import {actions} from 'store/slices';

const Wrapper = styled.View`
  padding: 20px;
  flex: 1;
  justify-content: space-around;
`;

const ActionsWrapper = styled.View`
  margin-top: 20px;
  max-height: 200px;
  padding: 10px;
  flex-grow: 1;
  background: red;
  justify-content: space-between;
  align-items: center;
`;

const SliderInput = styled(Controller)`
  margin: 20px 0;
`;

const FormHeader = styled.View`
  align-items: center;
`;
const FormHeaderText = styled.Text`
  font-family: 'Academy Engraved LET';
  font-weight: bold;
  font-size: 40px;
`;

const FormElement = styled.View`
  padding: 20px 0;
  margin-bottom: ${({isLast}) => (isLast ? '20px' : '0')};
`;

const FormElementHeader = styled.Text`
  align-self: center;
  margin-bottom: 10px;
  font-size: 20px;
  font-family: 'HoeflerText-Black';
`;
const FormElementValue = styled.Text`
  align-self: center;
  margin-top: 10px;
  font-size: 20px;
`;

const createSettingsObject = (settings) => {
  const {cardsX, turnsX, timeX, turnsMax, timeMax} = settings;

  return {
    turnsBonus: {
      multiplier: turnsX,
      max: turnsMax,
    },
    timeBonus: {
      multiplier: timeX,
      max: timeMax,
    },
    cardsBonus: {
      multiplier: cardsX,
    },
  };
};

const SettingsForm = ({
  settings: {
    cardsBonus: {multiplier: cardsX},
    timeBonus: {multiplier: timeX, max: timeMax},
    turnsBonus: {multiplier: turnsX, max: turnsMax},
  },
  updateSettings,
  goBack,
}) => {
  console.log(
    '[settings-form] cardsX, turnsX, timeX, turnsMax, timeMax,: ',
    cardsX,
    turnsX,
    timeX,
    turnsMax,
    timeMax,
  );

  const roundSettings = useForm();
  const scoreSettings = useForm();
  const [settings, setSettings] = useState({
    cardsX,
    turnsX,
    timeX,
    turnsMax,
    timeMax,
  });
  const [changed, setChanged] = useState(false);
  const onSubmit = (data) => console.log(data);
  const returnNewSettings = () => {
    const newState = createSettingsObject(settings);

    updateSettings(newState);
    setChanged(false);
  };

  const setValue = (value, attr, onChange) => {
    setChanged(true);
    setSettings({
      ...settings,
      [attr]: value,
    });
    onChange(value);
  };

  const gamesPerRound = [
    {name: '1', value: 1},
    {name: '4', value: 4},
  ];

  const settingsAttributes = [
    {
      name: 'cardsX',
      title: 'Card Penalty Multiplier',
      min: 0,
      max: 10000,
      step: 50,
    },
    {
      name: 'turnsX',
      title: 'Turns Penalty Multiplier',
      min: 0,
      max: 10000,
      step: 50,
    },
    {
      name: 'timeX',
      title: 'Time Penalty Multiplier',
      min: 0,
      max: 10000,
      step: 50,
    },
    {
      name: 'turnsMax',
      title: 'Turns Max Points',
      min: 0,
      max: 500000,
      step: 500,
    },
    {
      name: 'timeMax',
      title: 'Time Max Points',
      min: 0,
      max: 500000,
      step: 500,
    },
  ];

  return (
    <Wrapper>
      <DefaultForm flexGrow={3} maxWidth="500px">
        <FormHeader>
          <FormHeaderText>Round Settings</FormHeaderText>
          <FormElement isLast>
            <FormElementHeader>How many games in a round?</FormElementHeader>
            <Controller
              control={roundSettings.control}
              defaultValue={1}
              name="games"
              render={({onChange}) => (
                <RadioGroup
                  options={gamesPerRound}
                  setGames={(val) => {
                    setChanged(true);
                    onChange(val);
                  }}
                />
              )}
            />
          </FormElement>
        </FormHeader>
        <FormHeader>
          <FormHeaderText>Score Settings</FormHeaderText>
        </FormHeader>
        {settingsAttributes.map(({name, title, min, max, step}, i) => (
          <FormElement
            key={name}
            isLast={i === settingsAttributes.length - 1}
            idx={0}>
            <FormElementHeader>{title}</FormElementHeader>
            <SliderInput
              control={scoreSettings.control}
              name={name}
              defaultValue={settings[name]}
              render={({onChange}) => (
                <Slider
                  minimumValue={min}
                  maximumValue={max}
                  value={settings[name]}
                  tapToSeek={true}
                  step={step}
                  onValueChange={(val) => setValue(val, name, onChange)}
                />
              )}
            />
            <FormElementValue>{settings[name]}</FormElementValue>
          </FormElement>
        ))}
      </DefaultForm>
      <ActionsWrapper>
        <DefaultButton
          disabled={!changed}
          width="80%"
          onPress={scoreSettings.handleSubmit(returnNewSettings)}>
          Update
        </DefaultButton>
        <DefaultButton width="80%" margin="40px 0 0 0" onPress={goBack}>
          done
        </DefaultButton>
      </ActionsWrapper>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

const mapDispatchToProps = (dispatch) => ({
  updateSettings: (settings) => dispatch(actions.updateSettings({settings})),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsForm);
