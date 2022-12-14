interface Props {
  bannerUrl: string;
  title: string;
  adsCount: number;
}
export function GameBanner(props: Props) {
  const { adsCount, bannerUrl, title } = props;
  return (
    <div className="relative rounded-lg overflow-hidden keen-slider__slide">
      <img src={bannerUrl} alt={title} />

      <div className="w-full pt-16 pb-4 px-4 bg-nlw-gradient-game absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block ">{title}</strong>
        <span className="text-zinc-300 text-sm block">
          {adsCount} anúncio(s)
        </span>
      </div>
    </div>
  );
}
