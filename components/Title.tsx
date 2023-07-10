type TitleProps = {
  children: string;
};
export default function Title({ children }: TitleProps) {
  return <h1 className="text-[40px]">{children}</h1>;
}
