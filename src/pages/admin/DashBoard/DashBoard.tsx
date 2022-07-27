import React, { SyntheticEvent, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useLocalStorage } from "usehooks-ts";
import { AuthTokenType } from "../../../constant/type/DataType";

import CountInfo from "./CountInfo";
import TableUser from "./TableUser";

const DashBoard = () => {
  return (
    <div className="py-6 space-y-4">
      <CountInfo />
      <TableUser />
    </div>
  );
};

export default DashBoard;
