"use client";

import {
  notFound,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

const Page = () => {
  const router = useRouter();
  // const pathname = usePathname();
  // const params = useSearchParams();

  return (
    <div className="grid place-items-center min-h-screen text-4xl">
      <button onClick={() => router.back()}>Geri</button>

      <button onClick={() => router.forward()}>İleri</button>

      <button onClick={() => router.push("/gallery")}>Git</button>

      <button onClick={() => router.refresh()}>Yenile</button>
    </div>
  );
};

export default Page;
