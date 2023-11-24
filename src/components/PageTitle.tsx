export type PageTitleProps = {
  title: string;
};

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => (
  <h1 className="py-4 text-2xl font-bold">{title}</h1>
);
