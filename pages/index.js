import Head from "next/head";
import Image from "next/image";
import Stories from "../components/Stories";
import NewsFeed from "../components/NewsFeed";
import NewsFeedSideBar from "../components/NewsFeedSideBar";
import SideNavLayout from "../components/SideNavLayout";
import { getSession } from "next-auth/react";

export default function Home({ user }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      <SideNavLayout>
        <main className="basis-9/12 scrollbar-hide">
          <Stories />
          <div className="sm:flex justify-center sm:pt-5 sm:p-5 space-x-0 sm:space-x-10 ">
            <NewsFeed />
            <NewsFeedSideBar />
          </div>
        </main>
      </SideNavLayout>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: session.user,
    },
  };
}
