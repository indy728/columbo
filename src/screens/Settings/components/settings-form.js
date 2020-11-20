import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import styled from 'styled-components';
import Slider from '@react-native-community/slider';
import {RadioGroup, DefaultButton} from 'components/UI';

const Wrapper = styled.View`
  padding: 20px;
  flex: 1;
  justify-content: space-around;
`;
const FormWrapper = styled.ScrollView`
  padding: 20px;
  flex: 5;
  max-height: 700px;
  background: green;
`;
const ActionsWrapper = styled.View`
  margin-top: 20px;
  max-height: 200px;
  padding: 10px;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.TextInput`
  height: 40px;
  border: 2px solid black;
`;

const Button = styled.Button``;

const FormHeader = styled.View``;
const FormHeaderText = styled.Text``;

const FormElement = styled.View``;
const FormElementHeader = styled.Text``;
const FormElementValue = styled.Text``;

export default () => {
  const roundSettings = useForm();
  const scoreSettings = useForm();
  const [settings, setSettings] = useState({
    cardsX: 5000,
    turnsX: 1000,
    timeX: 1000,
    turnsMax: 100000,
    timeMax: 100000,
  });
  const [changed, setChanged] = useState(false);
  const onSubmit = (data) => console.log(data);
  const submitForms = (data) => {
    console.log('[settings-form] data: ', data);
    // scoreSettings.handleSubmit(onSubmit(data));
    // roundSettings.handleSubmit(onSubmit(data));
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
      title: 'Card Score Multiplier',
      min: 0,
      max: 10000,
      step: 50,
    },
    {
      name: 'turnsX',
      title: 'Turns Score Multiplier',
      min: 0,
      max: 10000,
      step: 50,
    },
    {
      name: 'timeX',
      title: 'Time Score Multiplier',
      min: 0,
      max: 10000,
      step: 50,
    },
    {
      name: 'turnsMax',
      title: 'Turns Max Points',
      min: 0,
      max: 100000,
      step: 500,
    },
    {
      name: 'timeMax',
      title: 'Time Max Points',
      min: 0,
      max: 100000,
      step: 500,
    },
  ];

  return (
    <Wrapper>
      <FormWrapper>
        <FormHeader>
          <FormHeaderText>Round Settings</FormHeaderText>

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
        </FormHeader>
        <FormHeader>
          <FormHeaderText>Score Settings</FormHeaderText>
        </FormHeader>
        {settingsAttributes.map(({name, title, min, max, step}) => (
          <FormElement key={name}>
            <FormElementHeader>{title}</FormElementHeader>
            <Controller
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
      </FormWrapper>
      <ActionsWrapper>
        <DefaultButton disabled={!changed} width="80%" onPress={submitForms}>
          Update
        </DefaultButton>
        <DefaultButton width="80%">done</DefaultButton>
      </ActionsWrapper>
    </Wrapper>
  );
};
