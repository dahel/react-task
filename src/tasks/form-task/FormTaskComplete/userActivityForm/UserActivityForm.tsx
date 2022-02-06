import { SyntheticEvent } from 'react';
import styled from 'styled-components';
import Card from '../components/card/Card';
import useForm, { IFormValues, Form, IFormConfig } from '../hooks/useForm/useForm';
import formFields from './formFields';

const Wrapper = styled.div`
  font-family: sans-serif;
  font-size: 14px;
  color: #424242;
`;

const Row = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Col = styled.div`
  width: 48%;
  min-width: 200px;
  margin-bottom: 10px;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #004c87;
  border: none;
  color: #bfe3ff;
  margin: 20px auto;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: all 0.2s;

  &:hover {
    background-color: #0860a3;
  }
`;

interface IProps {
  submit: (values: IFormValues, reset: () => void) => void;
  pending: boolean;
}

const UserActivityForm = ({ submit, pending }: IProps) => {
  const [form, getValues, validateForm, reset]: [
    Form,
    () => IFormValues,
    () => boolean,
    (formConfig: IFormConfig) => void,
  ] = useForm(formFields);
  const resetForm = (): void => reset(formFields);

  return (
    <Wrapper>
      <form
        action=""
        onSubmit={(event: SyntheticEvent) => {
          event.preventDefault();

          validateForm() && submit(getValues(), resetForm);
        }}>
        <Card title="Personal Info" pending={pending}>
          <Row>
            <Col>{form.firstname.render()}</Col>
            <Col>{form.lastname.render()}</Col>
          </Row>
          <Row>
            <Col>{form.birthday.render()}</Col>
          </Row>
        </Card>
        <Card title="User Management" pending={pending}>
          <Row>
            <Col>{form.userType.render()}</Col>
          </Row>
          <Row>
            <Col>{form.userInactivityDate.render()}</Col>
          </Row>
        </Card>
        <SaveButton disabled={pending}>{pending ? 'Saving...' : 'Save'}</SaveButton>
      </form>
    </Wrapper>
  );
};

export default UserActivityForm;
