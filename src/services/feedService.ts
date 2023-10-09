import { supabase } from "@/config";
import { ActivityFromApi } from "@/models";

export const feedService = {
  getFeed: async (): Promise<ActivityFromApi[]> => {
    const { data, error } = await supabase.from("activity_log").select();

    if (error) throw new Error(error.message);

    return data as unknown as ActivityFromApi[];
  },
};
