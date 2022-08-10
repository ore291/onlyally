import { FaCrown, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { upgradePackageStart } from "../../store/slices/userSlice";
import { useState } from "react";
export const GoProStar = () => {
  const dispatch = useDispatch();
  const [malware, setMalware] = useState("Loading please wait...");

  const upgrade = () => {
    dispatch(upgradePackageStart());
  };
  const Loading = useSelector((state) => state.user.upgradePackage.loading);
  const LoadingState = useSelector(
    (state) => state.user.upgradePackage.loadingButtonContent
  );
  //console.log(Audios);

  const [testtwo, setTestTwo] = useState(false);
  const run = () => {
    upgrade();
    setTestTwo(true);
    setTimeout(() => {
      if (!Loading) {
        setTestTwo(false);
      }
    }, 3000);
    setTimeout(() => {
      if (!Loading) {
        setTestTwo(false);
      }
    }, 3000);
  };

  //const data = Audios.data.posts.slice(1);
  return (
    <div className="w-full lg:w-[27%]  mt-8 px-4 py-8 bg-white hover:bg-gray-50 transition duration-200 ease-out rounded-lg shadow-lg">
      <section className="space-y-2">
        <img
          src="/images/settings/goprostar.png"
          alt="goprostar"
          className="w-3/12  "
        />

        <h3 className="font-bold text-xl ">Star</h3>
        <h2 className="font-medium text-2xl ">Minimum Requirement</h2>
        <h1 className="font-bold ">
          100
          <span className="font-light text-lg text-gray-500">/ Followers</span>
        </h1>
        <button
          onClick={() => {
            run();
          }}
          className="bg-red-400 my-8 text-lg font-medium hover:bg-red-500 text-white shadow-sm rounded-lg w-full px-4 py-2 transition duration-100 ease-linear"
        >
          {testtwo ? "Loading please wait..." : "Upgrade Now"}
        </button>
      </section>

      <section className="space-y-2 pt-2">
        <p className="font-bold ">Payout is 55% of all earnings</p>

        <div className="space-y-2 font-medium">
          <article className="flex gap-2 items-center">
            <span>
              <FaCheckCircle className="text-red-500" />
            </span>
            <span>Profile Pivacy</span>
          </article>

          <article className="flex gap-2 items-center">
            <span>
              <FaCheckCircle className="text-red-500" />
            </span>
            <span>Create Channel</span>
          </article>

          <article className="flex gap-2 items-center">
            <span>
              <FaTimesCircle className="text-gray-400" />{" "}
            </span>
            <span>Create Group</span>
          </article>

          <article className="flex gap-2 items-center">
            <span>
              <FaTimesCircle className="text-gray-400" />{" "}
            </span>
            <span>Featured member</span>
          </article>

          <article className="flex gap-2 items-center">
            <span>
              <FaTimesCircle className="text-gray-400" />{" "}
            </span>
            <span>See profile visitors</span>
          </article>

          <article className="flex gap-2 items-center">
            <span>
              <FaTimesCircle className="text-gray-400" />{" "}
            </span>
            <span>Show / Hide last seen</span>
          </article>

          <article className="flex gap-2 items-center">
            <span>
              <FaTimesCircle className="text-gray-400" />{" "}
            </span>
            <span>Verified badge</span>
          </article>
        </div>
      </section>
    </div>
  );
};

export const GoProFire = () => {
  const dispatch = useDispatch();
  const [malware, setMalware] = useState("Loading please wait...");
  const upgrade = () => {
    dispatch(upgradePackageStart());
  };
  const Loading = useSelector((state) => state.user.upgradePackage.loading);
  const LoadingState = useSelector(
    (state) => state.user.upgradePackage.loadingButtonContent
  );
  const [testtwo, setTestTwo] = useState(false);
  const run = () => {
    upgrade();
    setTestTwo(true);
    setTimeout(() => {
      if (!Loading) {
        setTestTwo(false);
      }
    }, 3000);
    setTimeout(() => {
      if (!Loading) {
        setTestTwo(false);
      }
    }, 3000);
  };

  return (
    <div className="w-full lg:w-[27%]  mt-8 px-4 py-8 bg-white hover:bg-gray-50 transition duration-200 ease-out rounded-lg shadow-lg">
      <section className="space-y-2">
        <img
          src="/images/settings/goprofire.png"
          alt="goprostar"
          className="w-3/12"
        />
        <h3 className="font-bold text-xl">Hot</h3>
        <h2 className="font-medium text-2xl">Minimum Requirement</h2>
        <h1 className="font-bold">
          1000
          <span className="font-light text-lg text-gray-500">/ Followers</span>
        </h1>
        <button
          onClick={run}
          className="bg-red-400 my-8 text-lg font-medium hover:bg-red-500 text-white shadow-sm rounded-md w-full px-4 py-2 transition duration-100 ease-linear"
        >
          {testtwo ? "Loading please wait..." : "Upgrade Now"}
        </button>
      </section>

      <section className="space-y-2 pt-2">
        <p className="font-bold">Payout is 65% of all earnings</p>

        <div className="space-y-2 font-medium">
          <article className="flex gap-2 items-center">
            <span>
              <FaCheckCircle className="text-red-500" />
            </span>
            <span>Profile Pivacy</span>
          </article>

          <article className="flex gap-2 items-center">
            <span>
              <FaCheckCircle className="text-red-500" />
            </span>
            <span>Create Channel</span>
          </article>

          <article className="flex gap-2 items-center">
            <span>
              <FaCheckCircle className="text-red-500" />
            </span>
            <span>Create Group</span>
          </article>

          <article className="flex gap-2 items-center">
            <span>
              <FaTimesCircle className="text-gray-400" />{" "}
            </span>
            <span>Featured member</span>
          </article>

          <article className="flex gap-2 items-center">
            <span>
              <FaCheckCircle className="text-red-500" />
            </span>
            <span>See profile visitors</span>
          </article>

          <article className="flex gap-2 items-center">
            <span>
              <FaCheckCircle className="text-red-500" />
            </span>
            <span>Show / Hide last seen</span>
          </article>

          <article className="flex gap-2 items-center">
            <span>
              <FaTimesCircle className="text-gray-400" />{" "}
            </span>
            <span>Verified badge</span>
          </article>
        </div>
      </section>
    </div>
  );
};

export const GoProFlash = () => {
  const dispatch = useDispatch();

  const upgrade = () => {
    dispatch(upgradePackageStart());
  };
  const Loading = useSelector((state) => state.user.upgradePackage.loading);
  const LoadingState = useSelector(
    (state) => state.user.upgradePackage.loadingButtonContent
  );
  const [testtwo, setTestTwo] = useState(false);
  const run = () => {
    upgrade();
    setTestTwo(true);
    setTimeout(() => {
      if (!Loading) {
        setTestTwo(false);
      }
    }, 3000);
    setTimeout(() => {
      if (!Loading) {
        setTestTwo(false);
      }
    }, 3000);
  };
  return (
    <div className="w-full lg:w-[27%]  mt-8 px-4 py-8 bg-white hover:bg-gray-50 transition duration-200 ease-out rounded-lg shadow-lg">
      <section className="space-y-2">
        <img
          src="/images/settings/goproflash.png"
          alt="goprostar"
          className="w-3/12"
        />
        <h3 className="font-bold text-xl">Vip</h3>
        <h2 className="font-medium text-2xl">Minimum Requirement</h2>
        <h1 className="font-bold">
          20000
          <span className="font-light text-lg text-gray-500">/ Followers</span>
        </h1>

        <button
          onClick={run}
          className="bg-red-400 text-lg font-medium hover:bg-red-500 text-white shadow-sm rounded-md w-full px-4 py-2 transition duration-100 ease-linear"
        >
          {testtwo ? "Loading please wait..." : "Upgrade Now"}
        </button>
      </section>

      <section className="space-y-2 pt-2">
        <p className="font-bold">Payout is 80% of all earnings</p>

        <div className="space-y-2 font-medium">
          <article className="flex gap-2 items-center">
            <span>
              <FaCheckCircle className="text-red-500" />
            </span>
            <span>Profile Pivacy</span>
          </article>

          <article className="flex gap-2 items-center">
            <span>
              <FaCheckCircle className="text-red-500" />
            </span>
            <span>Create Channel</span>
          </article>

          <article className="flex gap-2 items-center">
            <span>
              <FaCheckCircle className="text-red-500" />
            </span>
            <span>Create Group</span>
          </article>

          <article className="flex gap-2 items-center">
            <span>
              <FaCheckCircle className="text-red-500" />
            </span>
            <span>Featured member</span>
          </article>

          <article className="flex gap-2 items-center">
            <span>
              <FaCheckCircle className="text-red-500" />
            </span>
            <span>See profile visitors</span>
          </article>

          <article className="flex gap-2 items-center">
            <span>
              <FaCheckCircle className="text-red-500" />
            </span>
            <span>Show / Hide last seen</span>
          </article>

          <article className="flex gap-2 items-center">
            <span>
              <FaCheckCircle className="text-red-500" />
            </span>
            <span>Verified badge</span>
          </article>
        </div>
      </section>
    </div>
  );
};
