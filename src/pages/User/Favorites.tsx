import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MapPin } from "lucide-react";

export default function Favorites() {
  return (
    <div className="w-full max-w-[1280px] mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Favorites</h1>
        <p className="text-muted-foreground mt-1">
          Tours you&apos;ve saved for later
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-6">
            <Heart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
          <p className="text-muted-foreground mb-6 max-w-sm">
            Save tours you love by clicking the heart icon. Your favorites will
            appear here.
          </p>
          <Button asChild>
            <Link to="/tour" className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Browse Tours
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
