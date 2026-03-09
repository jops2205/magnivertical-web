import { api } from "@/api";
import { type User, userSchema } from "@/api/schemas/user-schema";

type GetUserResponse = User;

export const getUserService = async () => {
	const { data } = await api.get<GetUserResponse>("/users");

	return userSchema.parse(data);
};
