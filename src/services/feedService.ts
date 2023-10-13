import { supabase } from "@/config";
import { ActivityFromApi } from "@/models";

class FeedService {
  getFeed = async (): Promise<ActivityFromApi[]> => {
    const { data, error } = await supabase
      .from("activity_log")
      .select()
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data as unknown as ActivityFromApi[];
  };
}

export const feedService = new FeedService();
