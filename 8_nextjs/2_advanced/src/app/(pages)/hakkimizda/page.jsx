"use client";

import { notFound, redirect } from "next/navigation";
import Input from "./input";
import Form from "next/form";

const make = async (params) => {
  console.log(params);
};

const Page = () => {
  // notFound();
  // redirect("/gallery");

  return (
    <div className="p-10 text-3xl text-center my-20 border border-blue-500 ">
      <h1>Hakkımızda Sayfası</h1>

      <Form action="/search">
        <input name="query" type="text" />

        <button type="submit">Gönder</button>
      </Form>

      <Input />

      <ul>
        <li>nextjs öğren</li>
        <li>typescript öğren</li>
        <li>microservice öğren</li>
      </ul>

      <br />

      <span className="server">Server Component (SSR)</span>
    </div>
  );
};

export default Page;
