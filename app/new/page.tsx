import Link from "next/link";
import prisma from "../db";
import { redirect } from "next/navigation";
async function createTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("invalid title");
  }
  await prisma.todo.create({ data: { title, complete: false } });
  redirect("/");
}
export default function NewPage() {
  return (
    <>
      {" "}
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl">New</h1>
      </header>
      <form action={createTodo} className="flex gap-2 flex-col">
        <input
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
          type="text"
          name="title"
        ></input>
        <div className="flex justify-end">
          <Link
            className="border border-slate-300 text-slate-3000 px-2 py-1 rounded hover:bg-slate-700 focus:focus-within:bg-slate outline-none"
            href="/"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-3000 px-2 py-1 rounded hover:bg-slate-700 focus:focus-within:bg-slate outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
