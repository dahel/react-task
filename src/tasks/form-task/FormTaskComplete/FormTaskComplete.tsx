import { useState } from 'react';
import styled from 'styled-components';
import UserActivityForm from './userActivityForm/UserActivityForm';
import { saveUserForm } from './form-api';
import type { IFormValues } from './hooks/useForm/useForm';

const Wrapper = styled.div`
  font-family: sans-serif;
  font-size: 14px;
  color: '#424242';
`;

export const FormTaskComplete = () => {
  const [pending, setPending] = useState(false);

  return (
    <Wrapper>
      <UserActivityForm
        pending={pending}
        submit={async (values: IFormValues) => {
          console.log(values);

          setPending(true);

          await saveUserForm();

          setPending(false);
        }}
      />
    </Wrapper>
  );
};
