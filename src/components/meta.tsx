import React, { FC, useContext } from "react";
import Head from "next/head";

interface MetaProps {
  title?: any;
}

const Meta: FC<MetaProps> = ({ title }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta charSet="utf-8" />

      <title>{`${title ?? ""}`}</title>
    </Head>
  );
};

export default Meta;
