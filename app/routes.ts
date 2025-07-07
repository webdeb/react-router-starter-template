import { type RouteConfig, type RouteConfigEntry, index, route } from "@react-router/dev/routes";

const API_ROUTES: RouteConfigEntry[] = [
  route("api/hello", "routes/api/hello.ts"),
  route("api/counter", "routes/api/counter.ts"),
];

export default [index("routes/home.tsx"), ...API_ROUTES] satisfies RouteConfig;
