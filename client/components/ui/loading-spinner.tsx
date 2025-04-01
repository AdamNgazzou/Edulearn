import { Loader } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}