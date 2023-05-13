import React from "react";

const GA_TAG_ID = "G-SG2F4301GR";

const GoogleAnalytic = () => {
  return (
    <React.Fragment>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TAG_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TAG_ID}', {
          page_path: window.location.pathname,
        });
      `,
        }}
      />
    </React.Fragment>
  );
};

export default GoogleAnalytic;
