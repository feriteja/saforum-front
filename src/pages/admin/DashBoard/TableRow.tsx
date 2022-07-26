import React, { useState } from "react";
import Moment from "react-moment";
import { AuthTokenType, UserType } from "../../../constant/type/DataType";
import { UserState } from "../../../context/UserContext";
import { changeUserRole } from "../../../function/handler/user/userhandler";

interface props {
  data: UserType;
  token?: AuthTokenType | null;
}

const TableRow = (props: props) => {
  const { user } = UserState();
  const [role, setRole] = useState<string>(props.data.role);

  const onChange = async (userRole: string) => {
    try {
      setRole(userRole);
      await changeUserRole(props?.token, props.data.uuid, userRole);
    } catch (error) {
      throw error;
    }
  };

  return (
    <tr className="bg-primary border-b-2">
      <th scope="row" className="py-4 px-6 font-medium  whitespace-nowrap ">
        {props.data.username}
      </th>
      <td className="py-4 px-6">{props.data.uuid} </td>
      <td className="py-4 px-6">
        {" "}
        <Moment
          format="D MMM YYYY"
          date={props.data.created_at}
          withTitle
          className=""
        />
      </td>
      <td className="py-4 px-6">
        <select
          id="countries"
          disabled={user?.role !== "superadmin"}
          value={role}
          onChange={(role) => onChange(role.target.value)}
          className="bg-primary border border-gray-300   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:cursor-not-allowed  "
        >
          <option value="user">user</option>
          <option value="admin" className="disabled:bg-gray-400 ">
            admin
          </option>
        </select>
      </td>
    </tr>
  );
};

export default TableRow;
