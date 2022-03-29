import clsx from "clsx";

const li = `flex items-center text-slate-600`;
const span = `w-16 h-2 border rounded-full mr-2`;

export default function Legend() {
  return (
    <div className="mt-5 px-4">
      <h2 className="mb-2 text-sm font-semibold">
        Hours Since Plow was on Road
      </h2>
      <ul className="flex flex-col">
        <li className={li}>
          <span className={clsx(span, "border-slate-300 bg-slate-300")}></span>
          not plowed
        </li>
        <li className={li}>
          <span className={clsx(span, "border-green-500 bg-green-500")}></span>
          <span>0 - 12</span>
        </li>
        <li className={li}>
          <span className={clsx(span, "border-amber-500 bg-amber-500")}></span>
          <span>13 - 24</span>
        </li>
        <li className={li}>
          <span className={clsx(span, "border-red-500 bg-red-500")}></span>
          &gt;24
        </li>
      </ul>
    </div>
  );
}
