import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import styled from 'styled-components';
import {RadioGroup} from 'components/UI';

const Wrapper = styled.View`
  padding: 20px;
`;

const Input = styled.TextInput`
  height: 40px;
  border: 2px solid black;
`;

const Button = styled.Button``;

const Text = styled.Text``;

export default () => {
  const {control, handleSubmit, errors} = useForm();
  const onSubmit = (data) => console.log(data);

  const gamesPerRound = [
    {
      name: '1',
      value: 1,
      active: true,
    },
    {
      name: '4',
      value: 4,
      active: false,
    },
  ];

  return (
    <Wrapper>
      <Controller
        control={control}
        name="userName"
        defaultValue=""
        rules={{required: true}}
        render={({onChange, onBlur, value}) => (
          <Input onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
      />
      <Controller
        control={control}
        defaultValue={1}
        name="games"
        render={({onChange}) => (
          <RadioGroup options={gamesPerRound} setGames={onChange} />
        )}
      />

      {errors.userName && <Text>Username is required</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </Wrapper>
  );
};
