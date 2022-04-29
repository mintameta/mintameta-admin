import React, { useContext, useMemo } from "react";
import styled, { ThemeContext } from "styled-components";

import { Link } from "react-router-dom";

interface ButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  href?: string;
  onClick?: any;
  size?: "sm" | "md" | "lg";
  text?: string;
  to?: string;
  className?: string;
  width?: number | string;
  target?: string;
  variant?: "default" | "secondary" | "tertiary" | "fourthly";
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  href,
  onClick,
  size = "sm",
  text,
  to,
  variant,
  className,
  width,
  target = "__blank",
}) => {
  const { color, spacing } = useContext(ThemeContext);

  let buttonColor: string;
  switch (variant) {
    case "secondary":
      buttonColor = color.white;
      break;
    case "default":
    default:
      buttonColor = color.primary.main;
  }

  let boxShadow: string;
  let buttonSize: number;
  let buttonPadding: number;
  let fontSize: number;
  switch (size) {
    case "sm":
      buttonPadding = spacing[2];
      buttonSize = 35;
      fontSize = 16;
      break;
    case "lg":
      buttonPadding = spacing[4];
      buttonSize = 50;
      fontSize = 16;
      break;
    case "md":
    default:
      buttonPadding = spacing[3];
      buttonSize = 50;
      fontSize = 16;
  }

  const ButtonChild = useMemo(() => {
    if (to) {
      return <StyledLink to={to}>{text}</StyledLink>;
    } else if (href) {
      return (
        <StyledExternalLink href={href} target={target}>
          {text}
        </StyledExternalLink>
      );
    } else {
      return text;
    }
  }, [href, text, to]);

  return (
    <StyledButton
      boxShadow={boxShadow}
      color={buttonColor}
      disabled={disabled}
      fontSize={fontSize}
      onClick={onClick}
      padding={buttonPadding}
      size={buttonSize}
      className={className}
      variant={variant}
      width={width}
    >
      {children}
      {ButtonChild}
    </StyledButton>
  );
};

interface StyledButtonProps {
  boxShadow: string;
  color: string;
  disabled?: boolean;
  fontSize: number;
  padding: number;
  size: number;
  variant?: string;
  width?: number | string;
}

const StyledButton = styled.button<StyledButtonProps>`
  align-items: center;
  background-color: ${(props) => props.theme.color.white};
  border: 0;
  border-radius: 20px;
  background-image: ${(props) =>
    props.variant === "secondary"
      ? "linear-gradient(90deg, #7076A8 0%, #5CA1C7 50%, #82C2CA 100%)"
      : "none"};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: ${(props) => (!props.disabled ? props.color : `${props.color}`)};
  cursor: pointer;
  display: flex;
  font-size: ${(props) => props.fontSize}px;
  border: ${(props) => (props.variant === "tertiary" ? "1px" : "0px")} solid
    ${(props) => props.theme.color.primary.main};
  height: ${(props) => props.size}px;
  justify-content: center;
  outline: none;
  padding-left: ${(props) => props.padding}px;
  padding-right: ${(props) => props.padding}px;
  pointer-events: ${(props) => (!props.disabled ? undefined : "none")};
  width: ${(props) => (props.width ? props.width : "100%")};
  opacity: ${(props) => (!props.disabled ? 1 : 0.6)};
  font-weight: 600;
`;

const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${(props) => -props.theme.spacing[4]}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
`;

const StyledExternalLink = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${(props) => -props.theme.spacing[4]}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
`;

export default Button;
