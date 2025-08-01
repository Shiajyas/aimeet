import { Loader2Icon } from "lucide-react";

interface Props {
  title?: string;
  description?: string;
}

export const LoadingState = ({ title, description }: Props) => {
  return (
    <div className="flex items-center justify-center min-h-screen py-4 px-8">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
        <Loader2Icon className="size-6 text-primary animate-spin" />
        <div className="flex flex-col text-center gap-y-2">
          <h6 className="text-lg font-medium">{title}</h6>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};
