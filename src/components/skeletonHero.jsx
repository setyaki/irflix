import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonHero() {
  return (
    <div>
      <div className="bg-slate-950 text-slate-400 w-full py-24 sm:py-12 xl:h-screen">
        <div className="container flex mx-auto px-4 h-full mt-6">
          <div className="flex justify-around items-center w-screen flex-col gap-8 md:flex-row lg:flex-row ">

            <div className="flex flex-col w-80">
              <Skeleton height={50} />
              <div className="mb-4"></div>
              <Skeleton count={10} />
            </div>

            <div className="flex ">
              <Skeleton height={400} width={300} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
