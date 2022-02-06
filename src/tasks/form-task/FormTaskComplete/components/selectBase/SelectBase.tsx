import { SyntheticEvent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 200px;
`;

const Label = styled.label`
  padding: 0 0 5px 5px;
`;

const Select = styled.select`
  padding: 5px;
  border: solid 1px #bdbdbd;
  border-radius: 4px;
`;
interface IProps {
  value: string;
  label: string;
  name: string;
  options: ISelectBaseOptions[];
  onChange?: (event: SyntheticEvent) => void;
}

export interface ISelectBaseOptions {
  value: string;
  label: string;
}

const SelectBase = ({ value, label, name, onChange = () => {}, options = [] }: IProps) => {
  return (
    <Wrapper>
      <Label htmlFor={name}>{label}</Label>
      <Select name={name} id={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
};

export default SelectBase;
