import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Counter } from "../components/Counter";
import axios from "axios";
import { CounterService } from "~/services/counter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Router + Drizzle + D1" },
    { name: "description", content: "A counter app with React Router, Drizzle ORM, and Cloudflare D1" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  return { 
    message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE,
    counters: await (new CounterService(context.cloudflare.env.DB)).getAllCounters()
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-8">
      <Welcome message={loaderData.message} />
      <Counter />
    </div>
  );
}
