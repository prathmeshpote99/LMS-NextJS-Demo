import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Footer from "@/components/Footer";
import Banner from "@/pages/home/components/Banner";
import Certifications from "@/pages/home/components/Certifications";
import Feature from "@/pages/home/components/Feature";
import SlidCard from "@/pages/home/components/SlidCard";
import TrainingModule from "@/pages/home/components/TrainingModule";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>LMS Ghana - Improve Your Skills</title>
        <meta name="description" content="Created by next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/faviconn.ico" />
      </Head>
      <Banner />
      <Certifications />
      <Feature />
      <TrainingModule />
      <SlidCard />
      <Footer />
    </>
  );
}
