//@ts-nocheck
import React from "react";


const Picker: React.FC = ({ value, onChangePicker, children }) => (
  <>
    <div className="flex-jc-center font-size-15">
      {children}
      <div className="flex-jc-end">
        <div
          className={`${value === "1W" ? "color-main" : ""} cursor-pointer`}
          onClick={() => {
            onChangePicker("1W");
          }}
        >
          1W
        </div>
        <div
          className={`${value === "1M" ? "color-main" : ""}  margin-left-10 cursor-pointer`}
          onClick={() => {
            onChangePicker("1M");
          }}
        >
          1M
        </div>
        <div
          className={`${value === "ALL" ? "color-main" : ""}  margin-left-10 cursor-pointer`}
          onClick={() => {
            onChangePicker("ALL");
          }}
        >
          ALL
        </div>
      </div>
    </div>
  </>
);

export default Picker;
