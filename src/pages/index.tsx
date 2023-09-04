import { Homepage } from "@/screens";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

export default function Home() {
  return (
    <>
      <Homepage />
    </>
  );
}

export const getServerSideProps = async (ctx: any) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return {
    props: {
      initialSession: session,
      user: session?.user ?? null,
    },
  };
};
