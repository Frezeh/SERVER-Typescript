import { object, string, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "name is required",
    }),
    logo: string({
      required_error: "logo is required",
    }),
  }),
};

const params = {
  params: object({
    teamId: string({
      required_error: "teamId is required",
    }),
  }),
};

export const createTeamSchema = object({
  ...payload,
});

export const getTeamSchema = object({
  ...params,
});

export const updateTeamSchema = object({
  ...payload,
  ...params,
});

export const deleteTeamSchema = object({
  ...params,
});

export type CreateTeamInput = TypeOf<typeof createTeamSchema>;
export type UpdateTeamInput = TypeOf<typeof updateTeamSchema>;
export type DeleteTeamInput = TypeOf<typeof deleteTeamSchema>;
export type ReadTeamInput = TypeOf<typeof getTeamSchema>;
