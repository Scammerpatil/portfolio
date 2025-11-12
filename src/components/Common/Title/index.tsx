export default function Title({
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string;
}) {
  return (
    <div className="mb-8 bg-base-200/80 py-6">
      <h1 className="font-bold text-3xl mb-2 text-center uppercase w-full">
        ⭐ {title} ⭐
      </h1>
      {subTitle && (
        <h2 className="font-semibold text-xl text-center">{subTitle}</h2>
      )}
    </div>
  );
}
