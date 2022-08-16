import { useQuery } from "@tanstack/react-query";
import React, {
  SyntheticEvent,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { BiSearch } from "react-icons/bi";
import { useLocalStorage } from "usehooks-ts";
import { AuthTokenType, UserType } from "../../../constant/type/DataType";
import { getAllUser } from "../../../function/handler/admin/adminhandler";

import TableRow from "./TableRow";

const TableUser = () => {
  const [userInput, setUserInput] = useState("");
  const [userList, setUserList] = useState<UserType[]>([]);

  const [page, setPage] = useState(0);
  const { isLoading, error, data } = useQuery(["allUser", page], () =>
    fetchAppLog()
  );

  const [token, setToken] = useLocalStorage<AuthTokenType | null>(
    "authToken",
    null
  );
  const nextPrevPage = (number: 1 | -1) => {
    setPage((prev) => prev + number);
  };

  const fetchAppLog = async () => {
    try {
      const limit = 20;
      const offset = page * limit;
      const res = await getAllUser({
        limit,
        offset,
        token: token as AuthTokenType,
      });
      return res;
    } catch (error) {
      throw error;
    }
  };

  const onsubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const list = await getAllUser({
        token: token as AuthTokenType,
        username: userInput,
      });

      setUserList(list?.data || []);
    } catch (error) {
      throw error;
    }
  };

  console.log(data);

  return (
    <>
      <form onSubmit={onsubmit} className="flex  justify-end">
        <div className="flex items-center space-x-2 bg-primary px-2 py-1 shadow-md rounded group focus-within:outline">
          <BiSearch />
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUserInput(e.target.value)}
            className="outline-none bg-primary  "
          />
        </div>
      </form>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center  text-gray-500 px-4 ">
          <thead className="text-xs text-gray-700 uppercase bg-accent ">
            <tr>
              <th scope="col" className="py-3 px-6">
                username
              </th>
              <th scope="col" className="py-3 px-6 hidden md:block">
                uuid
              </th>
              <th scope="col" className="py-3 px-6">
                created_at
              </th>
              <th scope="col" className="py-3 px-6">
                role
              </th>
            </tr>
          </thead>
          <tbody className="text-primary">
            {data?.data?.map((val, idx) => (
              <TableRow key={idx} data={val} token={token} />
            ))}
          </tbody>
        </table>
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
    </>
  );
};

export default TableUser;
