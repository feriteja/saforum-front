import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLocalStorage } from "usehooks-ts";
import { AuthTokenType } from "../../../constant/type/DataType";
import { getAppLog } from "../../../function/handler/admin/adminhandler";
import LogRow from "./LogRow";

const ApplogPage = () => {
  const [token, setToken] = useLocalStorage<AuthTokenType | null>(
    "authToken",
    null
  );
  const { isLoading, error, data } = useQuery(["applog"], () =>
    getAppLog(token as AuthTokenType)
  );

  return (
    <div className="py-6">
      <div className="min-h-screen  bg-primary rounded-md overflow-hidden ">
        <table className="w-full text-sm text-center  text-gray-500 px-4 ">
          <thead className="text-xs text-gray-700 uppercase bg-accent ">
            <tr>
              <th scope="col" className="py-3 px-6">
                username
              </th>
              <th scope="col" className="py-3 px-6 hidden md:block">
                role
              </th>
              <th scope="col" className="py-3 px-6">
                activity
              </th>
              <th scope="col" className="py-3 px-6">
                status
              </th>
              <th scope="col" className="py-3 px-6">
                time
              </th>
            </tr>
          </thead>
          <tbody className="text-primary">
            {data?.map((val, idx) => {
              return <LogRow key={val.logID} data={val} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplogPage;
