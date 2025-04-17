import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function WalletSkeleton() {
  return (
    <div className="space-y-4">
      <Card className="w-full bg-zinc-900 border-zinc-700">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-700" />
              <div>
                <Skeleton className="h-5 w-24 bg-zinc-700" />
                <Skeleton className="h-3 w-20 bg-zinc-700 mt-1.5" />
              </div>
            </div>
            <div className="text-right">
              <Skeleton className="h-5 w-16 bg-zinc-700 ml-auto" />
              <Skeleton className="h-3 w-12 bg-zinc-700 mt-1.5 ml-auto" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Button disabled className="w-full">
        Transfer
      </Button>
    </div>
  );
}
