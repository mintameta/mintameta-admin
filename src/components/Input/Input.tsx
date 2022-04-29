//@ts-nocheck
import React from "react";
import styled from "styled-components";

export interface InputProps {
  endAdornment?: React.ReactNode;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  startAdornment?: React.ReactNode;
  value: string;
  type?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  onChange,
  onBlur,
  onFocus,
  placeholder,
  value,
  type,
  className
}) => {
  return (
    <StyledInput
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
      className={className}
      onFocus={(e)=>{
        onFocus&&onFocus(e)
      }}
      onBlur={(e)=>{
        onBlur&&onBlur(e)
      }}
    />
  );
};

const StyledInput = styled.input`
  outline: none;
  border: none;
  background-color: transparent;
  text-align: right;
  font-size: 16px;
  margin: 0;
  padding: 0;
`;

export default Input;
