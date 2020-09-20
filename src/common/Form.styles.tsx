import styled from '@emotion/styled';
import { ButtonStyle } from '../App.styles';

export const FormWrapper = styled.section`
  padding: 12px;
  position: absolute;
  width: 100%;
  top: 108px;
  display: flex;
`;

export const Input = styled.input`
  background-color: white;
  border-radius: 0;
  border: 0;
  box-shadow: none;
  color: black;
  font-family: monospace;
  font-size: 1rem;
  height: 32px;
  margin: 0;
  padding: 0 6px;
  text-align: right;
  width: 150px;

  &::placeholder {
    font-size: 13px;
  }
`;

export const SubmitButton = styled.button`
  background-color: #2fadf7;
  ${ButtonStyle};
`;
export const ClearButton = styled.button`
  background-color: crimson;
  ${ButtonStyle};
`;
