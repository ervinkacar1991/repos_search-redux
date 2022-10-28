import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchReposAction } from "./redux/slices/githubSlices";

const Repo = () => {
  const { user } = useParams();
  const dispatch = useDispatch();
  const store = useSelector((state) => state?.repos);
  const navigate = useNavigate();

  const { reposList } = store;

  useEffect(() => {
    dispatch(fetchReposAction(user));
  }, []);
  return (
    <div class="flex justify-center items-center mt-10 scroll-pl-6 snap-y">
      <div class="w-1/3 flex flex-col justify-center pb-4 ">
        <button
          onClick={() => navigate("/")}
          class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-4"
        >
          Go back
        </button>
        {reposList?.name !== "Error" &&
          reposList?.map((repo) => (
            <>
              <div class="py-6 px-8 mb-4 bg-gray-400  rounded-lg ring-slate-900/5 shadow-lg space-y-3 hover:bg-gray-500 hover:ring-sky-500 ">
                <div class="flex items-center ">
                  <a
                    href={repo?.html_url}
                    target="_blank"
                    class="text-lg  text-gray-700 hover:text-gray-200"
                  >
                    {repo?.name}
                  </a>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default Repo;
