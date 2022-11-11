import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import MobileNav from "./mobile/MobileNav";
import SideNav from "./mobile/SideNav";
import MainMobileNav from "./mobile/MainMobileNav";
import { useEffect } from "react";
import { hasCookie } from "cookies-next";
import Head from "next/head";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import { useRouter } from "next/router";

const SideNavLayout = ({ children, title, ogType, ogImage }) => {
  // const checkSession = hasCookie("accessToken");
  // const router = useRouter();

  // useEffect(() => {
  //   !checkSession && router.push("/login")
  // }, [checkSession])

  return (
    <>
      <Head>
        <title>{title || "Playjor"}</title>
        {/* <link
          rel="icon"
          type="image/png"
          href={configData.site_icon}
          // sizes="16x16"
        /> */}

        <meta property="og:title" content="Playjor" />
        <meta property="og:type" content={ogType || "website"} />
        <meta
          property="og:image"
          content={ogImage || "https://onlyally.vercel.app/og.jpeg"}
        />
        <meta property="og:url" content="https://www.playjor.com/" />

        <meta
          name="description"
          content=" Playjor is a social marketplace that offers creators all the tools they need to grow their fan base, increase fan engagement and diversify their revenue streams."
        />

        <meta
          property="og:description"
          content=" Playjor is a social marketplace that offers creators all the tools they need to grow their fan base, increase fan engagement and diversify their revenue streams."
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="www.playjor.com" />
        <meta property="twitter:url" content="https://www.playjor.com" />
        <meta name="twitter:title" content="Playjor" />
        <meta
          name="twitter:description"
          content=" Playjor is a social marketplace that offers creators all the tools they need to grow their fan base, increase fan engagement and diversify their revenue streams."
        />
        <meta
          name="twitter:image"
          content="https://onlyally.vercel.app/og.jpeg"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 relative">
        <LeftSideBar />

        <main className="lg:col-span-9 ">{children}</main>
        <MobileView>
          <MobileNav />
        </MobileView>
        <MobileView>
          <SideNav />
        </MobileView>
        <BrowserView>
          <RightSideBar />
        </BrowserView>

        <MainMobileNav />
      </div>
    </>
  );
};

export default SideNavLayout;
