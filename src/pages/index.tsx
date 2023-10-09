import { Homepage, HomepageProps } from "@/screens";
import { movieService } from "@/services";

const GRID_BEGIN_PAGE = 2;

export default function Home({ initialMovies, initialPage }: HomepageProps) {
  return <Homepage initialMovies={initialMovies} initialPage={initialPage} />;
}

export async function getStaticProps() {
  try {
    const movies = await movieService.getPopularMovies(GRID_BEGIN_PAGE);

    return {
      props: {
        initialMovies: movies,
        initialPage: GRID_BEGIN_PAGE,
      },
      revalidate: 60 * 60 * 24,
    };
  } catch {
    return {
      props: {
        initialMovies: [],
        initialPage: GRID_BEGIN_PAGE,
      },
      revalidate: 60 * 60 * 24,
    };
  }
}
