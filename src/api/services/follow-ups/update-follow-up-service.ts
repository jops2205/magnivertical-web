import { api } from "@/api";
import type { FollowUpStatus } from "@/api/schemas/follow-up-schema";

type UpdateFollowUpData = {
	id: string;
	description: string;
	status: FollowUpStatus;
	nextSchedule?: Date;
};

export const updateFollowUpService = ({ id, ...data }: UpdateFollowUpData) => {
	return api.put(`/follow-ups/${id}`, data);
};
