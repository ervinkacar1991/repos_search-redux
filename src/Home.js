import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProfileAction } from "./redux/slices/githubSlices";

function Home() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const store = useSelector((state) => state?.repos);
  const { loading, users, error } = store;
  const navigate = useNavigate();

  return (
    <>
      <section class="relative 2xl bg-gray-800 min-h-screen">
        <div class="relative container px-4 mx-auto">
          <div class="text-center mb-20">
            <span class="text-lg text-blue-400 font-bold">
              SPARTANS TEST PROJECT
            </span>

            <h2 class="mt-10 mb-5 text-5xl font-bold font-heading text-indigo-300">
              GitHub Repos Search
            </h2>
            <div className="mt-1 flex justify-center">
              <form
                className="w-1/2 mt-8"
                onSubmit={(e) => {
                  e.preventDefault();

                  dispatch(fetchProfileAction(user));
                }}
              >
                <input
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  type="text"
                  name="email"
                  id="email"
                  className="shadow-sm text-center focus:ring-indigo-500 p-2 focus:border-indigo-500  sm:text-sm border-gray-300 w-full rounded-md lg:w-1/2"
                  placeholder="Search For User"
                />
              </form>
            </div>
          </div>

          {loading ? (
            <h1 className="text-green-300 text-3xl text-center">
              loading, please wait...
            </h1>
          ) : error ? (
            <h2 className="text-red-300 text-3xl text-center">
              {error?.data?.message}
            </h2>
          ) : (
            <>
              {users?.map((profile) => {
                return (
                  <div
                    class="max-w-2xl mx-auto"
                    onClick={() => navigate(`/repo/${profile?.login}`)}
                  >
                    <div class="flex flex-wrap -mx-4 pb-20">
                      <div class="w-full lg:w-1/2 px-4 mb-4 lg:mb-0 cursor-pointer">
                        <div class="bg-gray-400 rounded-lg ">
                          <div class="flex justify-center">
                            <img
                              class="w-36 h-36 mt-4 rounded-full"
                              src={profile?.avatar_url}
                              alt=""
                            />
                          </div>
                          <div class="px-14 py-8">
                            <div class="mb-6 py-px bg-gray-500"></div>
                            <h4 class="mb-8 lg:mb-4  text-gray">
                              Name: <span>{profile?.login}</span>
                            </h4>

                            <div class="mb-6 py-px bg-gray-500"></div>
                            <h4 class="mb-8 lg:mb-4  text-gray">
                              {" "}
                              Repositories:{" "}
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-green-500 text-green-800">
                                {profile?.public_repos
                                  ? profile?.public_repos
                                  : "N/A"}
                              </span>
                            </h4>

                            <div class="mb-6 py-px bg-gray-500"></div>
                            <div class="md:text-right">
                              <span
                                onClick={() =>
                                  navigate(`/repo/${profile?.login}`)
                                }
                                class="inline-block px-12 py-4 border border-gray-600 hover:border-gray-200 hover:text-color-white rounded-full text-gray"
                              >
                                View repos
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="w-full lg:w-1/2 px-4">
                        <div class="py-6 px-8"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
