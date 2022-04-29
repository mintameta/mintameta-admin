//@ts-nocheck
import React from "react";
import { useHistory } from "react-router-dom";
import Spacer from "../Spacer";
import Card from "../Card";
const BtnLink: React.FC = ({ text, path }) => {
  const history = useHistory();
  return (
    <>
         <Spacer />
      <Card
        className="wing-blank-lg width-100 text-center cursor-pointer"
        onClick={() => {
          //console.log(path);

          history.push(path);
        }}
      >
        <span className="color-light-blue text-underline cursor-pointer">{text}</span>
      </Card>
    </>
  );
};

export default BtnLink;
