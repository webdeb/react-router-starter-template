import { CounterService } from "~/services/counter";

export async function loader({ context }: { context: { cloudflare: { env: { DB: D1Database } } } }) {
  const counterService = new CounterService(context.cloudflare.env.DB);
  return counterService.getAllCounters().then(counters => ({ counters }));
}

export async function action({ request, context }: { 
  request: Request; 
  context: { cloudflare: { env: { DB: D1Database } } } 
}) {
  const counterService = new CounterService(context.cloudflare.env.DB);
  return request.formData().then(async (formData: FormData) => {
    const action = formData.get("action") as string;
    const id = formData.get("id") as string;

    switch (action) {
      case "increment":
        return counterService.incrementCounter(id).then(counter => ({ success: true, counter }));

      case "decrement":
        return counterService.decrementCounter(id).then(counter => ({ success: true, counter }));

      case "reset":
        return counterService.resetCounter(id).then(counter => ({ success: true, counter }));

      case "create":
        console.log("create");
        console.log(formData);

        const name = formData.get("name") as string;
        return counterService.createCounter({
          id: crypto.randomUUID(),
          name,
          value: 0,
        }).then(counter => ({ success: true, counter }));

      default:
        return Promise.resolve({ success: false, error: "Invalid action" });
    }
  });
} 