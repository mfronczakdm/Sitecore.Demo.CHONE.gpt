import { ATHLETE_FACETS } from "../constants/filters";
import { Athlete } from "../interfaces/athlete";
import { Sport } from "../interfaces/sport";

export const initializeAthletes = (athletes: Athlete[], sports: Sport[]) => {
  if (!athletes || !sports) {
    return [];
  }

  return athletes.map((item) => ({
    ...item,
    [ATHLETE_FACETS.sport]: item?.sport?.results?.length
      ? item.sport.results[0]?.id
      : null,
  }));
};
