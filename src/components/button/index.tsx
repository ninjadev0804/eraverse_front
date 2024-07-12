export default function Button({
  title,
  loading,
}: {
  title: any;
  loading?: any;
}) {
  return (
    <div
      data-testid="button-wrapper"
      className={`cursor-pointer flex justify-enter items-center h-full px-[19.5px] border-[1px] border-[#222222] border-solid bg-[#222222] ${
        loading ? "text-[#78DD64]" : ""
      } rounded-lg`}
    >
      <p className="text-[14px] ">{title ? title : "Title"}</p>
    </div>
  );
}
