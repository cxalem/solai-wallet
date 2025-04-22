import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingScreen() {
  return (
    <section className="flex flex-col items-center min-h-screen text-zinc-100">
      <Card className="w-full max-w-2xl shadow-lg border-zinc-800 bg-zinc-800 max-h-[60vh]">
        <CardHeader className="border-b border-zinc-700 pb-3">
          <CardTitle className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-full bg-zinc-700" />
            <Skeleton className="h-5 w-40 bg-zinc-700" />
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="h-[30vh] overflow-y-auto p-6 space-y-6">
            {/* Skeleton for AI message */}
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <Skeleton className="h-8 w-8 rounded-full bg-zinc-700 flex-shrink-0" />
                <Skeleton className="h-16 w-64 rounded-lg bg-zinc-700 rounded-tl-none" />
              </div>
            </div>

            {/* Skeleton for user message */}
            <div className="flex justify-end">
              <div className="flex gap-3 max-w-[80%] flex-row-reverse">
                <Skeleton className="h-8 w-8 rounded-full bg-zinc-700 flex-shrink-0" />
                <Skeleton className="h-12 w-48 rounded-lg bg-zinc-700 rounded-tr-none" />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t border-zinc-700 p-4">
          <div className="flex w-full gap-2">
            <Skeleton className="flex-1 h-10 bg-zinc-700 rounded" />
            <Skeleton className="h-10 w-10 bg-zinc-700 rounded" />
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
