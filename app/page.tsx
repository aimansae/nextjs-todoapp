import Link from "next/link";
import prisma from "./db";
import { TodoItem } from "./components/Todo";

function getTodos() {
  return prisma.todo.findMany();
}

export default async function Home() {
  const todos = await getTodos();
  // await prisma.todo.create({
  //   data: {
  //     title: "test",
  //     complete: false,
  //   },
  // });

  async function toggleTodo(id: string, complete: boolean) {
    "use server";
    console.log(id, complete);
    await prisma.todo.update({ where: { id }, data: { complete } });
  }
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-3000 px-2 py-1 rounded hover:bg-slate-700 focus:focus-within:bg-slate outline-none"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}></TodoItem>
        ))}
      </ul>
    </>
  );
}
