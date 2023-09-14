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
  const supabase = createPagesServerClient(ctx);

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
