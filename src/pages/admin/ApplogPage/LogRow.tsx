import React from "react";
import Moment from "react-moment";
import { AppLogType } from "../../../constant/type/DataType";

interface props {
  data: AppLogType;
}

const LogRow = ({ data }: props) => {
  console.log(data);
  return (
    <tr className="bg-primary border-b-2">
      <th scope="row" className="py-4 px-6 font-medium  whitespace-nowrap ">
        {data.username}
      </th>
      <td className="py-4 px-6 hidden md:block">{data.role}</td>
      <td className="py-4 px-6">{data.activity}</td>
      <td
        className={`py-4 px-6 m-2 ${
          data.status === "success" ? "bg-green-100" : "bg-red-100"
        } text-black `}
      >
        {data.status}
      </td>
      <td>
        <Moment format="D MMM YYYY" date={data.time} withTitle className="" />
      </td>
    </tr>
  );
};

export default LogRow;
