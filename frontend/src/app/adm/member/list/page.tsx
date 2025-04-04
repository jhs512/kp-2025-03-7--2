import { cookies } from "next/headers";

import client from "@/lib/backend/client";

import ClientPage from "./ClientPage";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    searchKeywordType?: "all" | "username" | "nickname";
    searchKeyword?: string;
    pageSize?: number;
    page?: number;
  }>;
}) {
  const {
    searchKeyword = "",
    searchKeywordType = "all",
    pageSize = 30,
    page = 1,
  } = await searchParams;

  const response = await client.GET("/api/v1/adm/members", {
    params: {
      query: {
        searchKeyword,
        searchKeywordType,
        pageSize,
        page,
      },
    },
    headers: {
      cookie: (await cookies()).toString(),
    },
  });

  const itemPage = response.data!;

  return (
    <>
      <ClientPage
        searchKeyword={searchKeyword}
        searchKeywordType={searchKeywordType}
        page={page}
        pageSize={pageSize}
        itemPage={itemPage}
      />
    </>
  );
}
