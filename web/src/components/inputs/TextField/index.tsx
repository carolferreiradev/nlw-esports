import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}
export function TextField(props: Props) {
  const { ...rest } = props;
  return (
    <input
      className="
        bg-zinc-900
          py-3
          px-4
          rounded
          text-sm
        placeholder:text-zinc-500"
      {...rest}
    />
  );
}
