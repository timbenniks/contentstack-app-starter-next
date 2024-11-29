"use client";

import { useContentstack } from "@/contexts/ContentstackContext";

export default function Home() {
  const { sdk, isInitialized, error } = useContentstack();

  console.log({ sdk, isInitialized, error });

  return <main>{sdk ? <h1>{JSON.stringify(sdk, null, 2)}</h1> : null}</main>;
}
