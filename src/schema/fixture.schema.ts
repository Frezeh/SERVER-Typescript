import { object, string, TypeOf } from "zod";

const payload = {
  body: object({
    homeTeam: string({
      required_error: "homeTeam is required",
    }),
    awayTeam: string({
      required_error: "awayTeam is required",
    }),
    time: string({
      required_error: "time is required",
    }),
    date: string({
      required_error: "date is required",
    }),
    stadium: string({
      required_error: "stadium is required",
    }),
    referee: string({
      required_error: "referee is required",
    }),
    status: string({
      required_error: "status is required",
    }),
  }),
};

const params = {
  params: object({
    fixtureId: string({
      required_error: "fixtureId is required",
    }),
  }),
};

const slugParams = {
  params: object({
    slug: string({
      required_error: "slug is required",
    }),
  }),
};

export const createFixtureSchema = object({
  ...payload,
});

export const getUniqueFixtureSchema = object({
  ...slugParams,
});

export const updateFixtureSchema = object({
  ...payload,
  ...params,
});

export const deleteFixtureSchema = object({
  ...params,
});

export type CreateFixtureInput = TypeOf<typeof createFixtureSchema>;
export type UpdateFixtureInput = TypeOf<typeof updateFixtureSchema>;
export type UniqueFixtureInput = TypeOf<typeof getUniqueFixtureSchema>;
export type DeleteFixtureInput = TypeOf<typeof deleteFixtureSchema>;
