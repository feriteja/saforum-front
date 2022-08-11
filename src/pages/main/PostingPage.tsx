import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import categoryList from "../../constant/data/category";
import { AuthTokenType } from "../../constant/type/DataType";
import { systemState } from "../../context/SystemContext";
import { addForum } from "../../function/handler/forum/forum";
import { useLocalStorage } from "usehooks-ts";

const PostingPage = () => {
  const [title, setTitle] = useState("second");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState("PUBLIC");
  const { showLoading, showSnackbar } = systemState();
  const [banner, setBanner] = useState("");

  const [token, setToken] = useLocalStorage<AuthTokenType | null>(
    "authToken",
    null
  );
  const navigate = useNavigate();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    showLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("refresh_token", token?.refresh_token || "");
    formData.append("content", content);
    formData.append("category", category);
    formData.append("banner", banner);

    try {
      await addForum({
        data: formData,
        token: token as AuthTokenType,
      });
      showLoading(false);
      showSnackbar("Post success :)");
      navigate("/");
    } catch (error) {
      showLoading(false);
      showSnackbar("Post failed :( .. something wrong");

      throw error;
    }
  };

  return (
    <div className="p-2">
      <h1 className="font-semibold text-lg">Create Post</h1>
      <div className="bg-primary shadow-md w-full px-3 py-4 mt-2">
        <form onSubmit={onSubmit} className="flex flex-col space-y-3">
          <input
            type="file"
            name="avatar"
            accept="image/*"
            multiple={false}
            onChange={(img: any) => setBanner(img.target.files[0])}
          />
          <input
            id="titlePost"
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
            className="w-full  border  border-primary rounded-md p-2 bg-primary shadow focus:outline focus:outline-1"
          />

          <textarea
            name="content"
            onChange={(e) => setContent(e.target.value)}
            id="content"
            rows={7}
            placeholder="content(optional)"
            className="resize-none w-full rounded-md shadow border focus:outline focus:outline-1 border-primary bg-primary p-2"
          />
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium  text-gray-400"
          >
            Select the category
          </label>
          <select
            id="countries"
            defaultValue={"PUBLIC"}
            onChange={(e) => setCategory(e.target.value)}
            className="  rounded-md block w-full p-2.5 shadow bg-primary border border-primary placeholder-gray-400  "
          >
            <option aria-required disabled>
              Choose a category
            </option>
            {categoryList.map((val, idx) => (
              <option value={val} key={val}>
                {val}
              </option>
            ))}
          </select>
          <input
            type="submit"
            value="Post"
            className="cursor-pointer self-end mr-3 text-black  rounded-full bg-accent  px-3 py-1 font-bold"
          />
        </form>
      </div>
    </div>
  );
};

export default PostingPage;
