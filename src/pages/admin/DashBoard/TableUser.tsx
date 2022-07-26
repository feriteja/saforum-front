import React, {
  SyntheticEvent,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { BiSearch } from "react-icons/bi";
import { useLocalStorage } from "usehooks-ts";
import { AuthTokenType, UserType } from "../../../constant/type/DataType";
import { getAllUser } from "../../../function/handler/user/userhandler";
import TableRow from "./TableRow";

const TableUser = () => {
  const [userInput, setUserInput] = useState("");
  const [userList, setUserList] = useState<UserType[]>([]);
  const username = useDeferredValue(userInput);

  const [token, setToken] = useLocalStorage<AuthTokenType | null>(
    "authToken",
    null
  );

  const onsubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const list = await getAllUser(token as AuthTokenType, userInput);
      console.log(list);
      setUserList(list || []);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getAllUser(token as AuthTokenType, username).then((res) =>
      setUserList(res || [])
    );

    return () => {};
  }, [username]);

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
              <th scope="col" className="py-3 px-6">
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
            {userList.map((val, idx) => (
              <TableRow key={val.username} data={val} token={token} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableUser;
