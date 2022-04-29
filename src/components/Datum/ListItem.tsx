//@ts-nocheck
import React from "react";
import Spacer from "../Spacer";
import Card from "../Card";

const ListItem: React.FC = ({
  text,
  color = "#5DB3D3",
  value,
  showSpacer = true,
}) => (
  <>
    <Card className="text-center flex1">
      <Spacer size="sm" />
      <div className="font-size-22 bold-600 " style={{ color }}>
        {value}
      </div>
      <Spacer size="sm" />
      <div className="color-grey">{text}</div>
      <Spacer size="sm" />
    </Card>
    {showSpacer ? <Spacer size="mmd" /> : null}
  </>
);

export default ListItem;
