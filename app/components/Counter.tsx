import { useFetcher, useLoaderData } from "react-router";
import type { Counter } from "../db/schema";
import { CounterService } from "../services/counter";
import type { Route } from "../routes/+types/home";

// Loader function for the Counter component
// export async function loader({ context }: { context: { cloudflare: { env: { DB: D1Database } } } }) {
//   const counterService = new CounterService(context.cloudflare.env.DB);
//   const counters = await counterService.getAllCounters();
//   return { counters };
// }


export function Counter() {
  // const { counters } = useLoaderData<typeof loader>();
  const { counters } = useLoaderData<Route.LoaderArgs>();
  const createFetcher = useFetcher();
  const actionFetcher = useFetcher();

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Counters</h2>
      
      {/* Create new counter */}
      <div className="mb-6 p-4 bg-gray-50 rounded">
        <h3 className="text-lg font-semibold mb-2">Create New Counter</h3>
        <createFetcher.Form method="post" action="/api/counter" className="flex gap-2">
          <input
            type="hidden"
            name="action"
            value="create"
          />
          <input
            type="text"
            name="name"
            placeholder="Counter name"
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={createFetcher.state === "submitting"}
          >
            {createFetcher.state === "submitting" ? "Creating..." : "Create"}
          </button>
        </createFetcher.Form>
      </div>

      {/* Display counters */}
      <div className="space-y-4">
        {counters.length === 0 ? (
          <p className="text-gray-500 text-center">No counters yet. Create one above!</p>
        ) : (
          (counters || []).map((counter: Counter) => (
            <div key={counter.id} className="p-4 border border-gray-200 rounded">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{counter.name}</h3>
                <span className="text-2xl font-bold text-blue-600">{counter.value}</span>
              </div>
              
              <div className="flex gap-2">
                <actionFetcher.Form method="post" action="/api/counter" className="flex-1">
                  <input type="hidden" name="action" value="increment" />
                  <input type="hidden" name="id" value={counter.id} />
                  <button
                    type="submit"
                    className="w-full px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={actionFetcher.state === "submitting"}
                  >
                    +
                  </button>
                </actionFetcher.Form>
                
                <actionFetcher.Form method="post" action="/api/counter" className="flex-1">
                  <input type="hidden" name="action" value="decrement" />
                  <input type="hidden" name="id" value={counter.id} />
                  <button
                    type="submit"
                    className="w-full px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    disabled={actionFetcher.state === "submitting"}
                  >
                    -
                  </button>
                </actionFetcher.Form>
                
                <actionFetcher.Form method="post" action="/api/counter" className="flex-1">
                  <input type="hidden" name="action" value="reset" />
                  <input type="hidden" name="id" value={counter.id} />
                  <button
                    type="submit"
                    className="w-full px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    disabled={actionFetcher.state === "submitting"}
                  >
                    Reset
                  </button>
                </actionFetcher.Form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 