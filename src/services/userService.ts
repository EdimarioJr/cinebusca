import { PostgrestError } from "@supabase/supabase-js";

import { supabase } from "@/config";

export const userService = {
  getUsername: async ({
    id,
  }: {
    id: string;
  }): Promise<{ data: string } | { error: PostgrestError }> => {
    const { data, error } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", id);

    if (error) return { error };

    return { data: data?.[0]?.name ?? "--" };
  },
};
