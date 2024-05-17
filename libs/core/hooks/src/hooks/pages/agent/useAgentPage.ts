// eslint-disable-next-line @nx/enforce-module-boundaries
import { useAuthContext, useUpdatePageName } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { useEffect, useState } from "react";

export function useAgentPage() {
  const [loading, setLoading] = useState(false);
  useUpdatePageName(i18n.t("usertype.agent"));
  const { isLogin } = useAuthContext();
  const data = {};
  const fetchAgentData = () => {
    return console.log("as");
  };

  // useEffect(() => {
  //   if (!isLogin) return;
  //   fetchAgentData();
  // }, []);

  return { fetchAgentData, loading };
}
