
import Image from "next/image";

interface Props {
  title?: string;
  description?: string;
}

export const EmptyState = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 px-8">
    <Image src="/empty.svg" alt="Empty" width={240} height={240} />
        <div className="flex flex-col text-center gap-y-6 mx-w-md mx-auto">
          <h6 className="text-lg font-medium">{title}</h6>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
  
  );
};
