import { TopEpisodes } from "@/home/TopEpisodes/TopEpisodes";
import { TopPodcasts } from "@/home/TopPodcasts/TopPodcasts";

export default function Home() {
  return (
    <div className="font-sans grid h-full overflow-y-auto pb-10 gap-16">
      <main className="flex flex-col gap-y-[25px] w-full overflow-x-hidden">
        <TopPodcasts />

        <TopEpisodes />
      </main>
    </div>
  );
}
