//@ts-nocheck
import React from "react";
import Spacer from "../Spacer";
import Card from "../Card";

const BigValue: React.FC = ({ text, color = "#5DB3D3",value }) => (
  <>
    <Card className="text-center">
      <Spacer size="sm" />
      <div className="font-size-50 bold-600 font-Wallpoet" style={{ color }}>
        {value}
      </div>
      <Spacer size="sm" />
      <div className="color-grey">{text}</div>
      <Spacer size="sm" />
    </Card>
    <Spacer size="sm" />
    <Spacer size="sm" />
  </>
);

export default BigValue;
