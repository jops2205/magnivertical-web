import { createBrowserRouter } from "react-router";
import { AppLayout } from "./app/_layout";
import { Customers } from "./app/customers";
import { Dashboard } from "./app/dashboard";
import { Projects } from "./app/projects";
import { Project } from "./app/projects/_id";
import { Tasks } from "./app/tasks";
import { Users } from "./app/users";
import { SignIn } from "./auth/sign-in";
import { Terms } from "./auth/terms";

export const router = createBrowserRouter([
	{
		path: "/sign-in",
		element: <SignIn />,
	},
	{
		path: "/terms",
		element: <Terms />,
	},
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Dashboard />,
			},
			{
				path: "/team",
				element: <Users />,
			},
			{
				path: "/tasks",
				element: <Tasks />,
			},
			{
				path: "/customers",
				element: <Customers />,
			},
			{
				path: "/projects",
				element: <Projects />,
			},
			{
				path: "/projects/:id",
				element: <Project />,
			},
		],
	},
]);
