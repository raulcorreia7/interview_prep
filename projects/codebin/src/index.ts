import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.get("/health", (c) => {
	return c.json(
		{
			status: "ok",
		},
		200,
	);
});
export default app;
