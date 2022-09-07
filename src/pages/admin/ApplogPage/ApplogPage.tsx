import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { AuthTokenType } from "../../../constant/type/DataType";
import { getAppLog } from "../../../function/handler/admin/adminhandler";
import LogRow from "./LogRow";

const ApplogPage = () => {
  const [token, setToken] = useLocalStorage<AuthTokenType | null>(
    "authToken",
    null
  );
  const [page, setPage] = useState(0);

  const nextPrevPage = (number: 1 | -1) => {
    setPage((prev) => prev + number);
  };

  const fetchAppLog = async () => {
    try {
      const limit = 20;
      const offset = page * limit;
      const res = await getAppLog({
        limit,
        offset,
        token: token as AuthTokenType,
      });
      return res;
    } catch (error) {
      throw error;
    }
  };

  const { isLoading, error, data } = useQuery(["applog", page], () =>
    fetchAppLog()
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
            {data?.data.map((val, idx) => {
              return <LogRow key={val.logID} data={val} />;
            })}
          </tbody>
        </table>
        <div></div>
      </div>
      <div className="flex justify-end space-x-4 font-semibold mx-3 text-lg">
        <button
          className="disabled:cursor-not-allowed"
          disabled={page === 0}
          onClick={() => nextPrevPage(-1)}
        >
          prev
        </button>
        <h1>{page + 1}</h1>
        <button
          className="disabled:cursor-not-allowed"
          disabled={data?.currentPages === data?.totalPages}
          onClick={() => nextPrevPage(1)}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default ApplogPage;
