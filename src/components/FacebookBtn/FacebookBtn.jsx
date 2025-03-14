import React from "react";
import { FacebookProvider, CustomChat } from "react-facebook";
const FacebookBtn = () => {
  return (
    <FacebookProvider appId="1148196663450850" chatSupport>
      <CustomChat pageId="531605270045666" minimized={false ? "true" : undefined} />
    </FacebookProvider>
  );
};

export default FacebookBtn;
