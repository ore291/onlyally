import { fetchSinglePageStart } from "../../store/slices/pageSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CommonCenterLoader from "../../components/helpers/CommonCenterLoader";
import SideNavLayout from "../../components/SideNavLayout";

const StaticPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const singlePage = useSelector((state) => state.page.pageData);
  const { title } = router.query;

  const [page, setPage] = useState({
    pageData: null,
    loadingPageData: true,
    active: null,
    singlePage: null,
    currentPageTitle: null,
  });

  useEffect(() => {
    setPage({ ...page, currentPageTitle: title });
    if (!router.isReady) return;

    dispatch(
      fetchSinglePageStart({
        unique_id: title,
      })
    );
  }, [router.isReady, title]);
  return (
    <>
        <div className="max-w-6xl mx-auto p-2 mt-4 md:mt-10 dark:text-gray-100 min-h-screen relative">
          {singlePage.loading ? (
            // t("loading")
            <CommonCenterLoader></CommonCenterLoader>
          ) : (
            <div className="container">
              <h4 className="head-title text-xl md:text-3xl text-center border-b w-full dark:border-gray-100 font-bold">{singlePage.data.title}</h4>
           
                <div className="w-full">
                  <div className="static-box">
                    {/* <h5 className="my-3">
                      updated_at: {singlePage.data.updated_at_formatted}
                    </h5> */}
                    <div

                        className="dark:!text-gray-100 text-justify w-full"
                      dangerouslySetInnerHTML={{
                        __html: singlePage.data.description,
                      }}
                    ></div>
                  </div>
                </div>
             
            </div>
          )}
        </div>
      </>
  );
};

export default StaticPage;
