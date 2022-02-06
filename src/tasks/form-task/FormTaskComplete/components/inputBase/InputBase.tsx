import { SyntheticEvent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 200px;
  height: 60px;
`;

const Label = styled.label`
  padding: 0 0 5px 5px;
`;

const Input = styled.input`
  padding: 5px;
  border: solid 1px ${({ error }: { error: boolean }) => (error ? 'red' : '#BDBDBD')};
  border-radius: 4px;
`;

const Required = styled.span`
  &::after {
    content: '*';
    color: red;
  }
`;

const RequiredMessage = styled.span`
  color: red;
  font-size: 11px;
  height: 13px;
  text-indent: 5px;
  margin-top: 1px;
`;

interface IProps {
  value: string;
  label: string;
  name: string;
  placeholder?: string;
  onBlur?: (event: SyntheticEvent) => void;
  onChange?: (event: SyntheticEvent) => void;
  required?: boolean;
  type?: string;
  validationError?: string;
  valid?: boolean;
  disabled?: boolean;
}

const InputBase = ({
  value,
  label,
  name,
  placeholder = '',
  onBlur = () => {},
  onChange = () => {},
  required = false,
  type = 'text',
  validationError = '',
  valid = true,
  disabled = false,
}: IProps) => {
  return (
    <Wrapper>
      <Label htmlFor={name}>
        {label} {required && <Required />}
      </Label>
      <Input
        disabled={disabled}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        error={!valid}
      />
      {!valid && <RequiredMessage>{validationError}</RequiredMessage>}
    </Wrapper>
  );
};

export default InputBase;
