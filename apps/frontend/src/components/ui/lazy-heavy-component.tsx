'use client';

import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./heavy-component"), {
  loading: () => <p className="mt-8">Loading heavy component...</p>,
  ssr: false,
});

export function LazyHeavyComponent() {
  return <HeavyComponent />;
}
