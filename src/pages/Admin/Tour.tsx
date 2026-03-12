/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import AddTourModal from "@/components/modules/Tour/AddTourModal";
import UpdateTour from "@/components/modules/Tour/UpdateTour";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteTourMutation,
  useGetTourQuery,
} from "@/redux/features/tour/tour.api";
import { Trash2, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function TourPackageTable() {
  const { data: tourData = [], isLoading } = useGetTourQuery(undefined);
  const [DeleteTour] = useDeleteTourMutation();

  const handleRemoveTour = async (id: string) => {
    try {
      const res = await DeleteTour(id);
      if (res.data?.success) {
        toast.success("Tour Deleted Successfully");
      }
    } catch {
      toast.error("An error occurred while deleting");
    }
  };

  const tours = tourData?.data?.data || [];

  return (
    <div className="w-full max-w-[1280px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <MapPin className="h-7 w-7 text-primary" />
            Tour Packages
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your tour offerings
          </p>
        </div>
        <AddTourModal />
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
              <TableHead className="font-semibold text-foreground py-4 px-4">Title</TableHead>
              <TableHead className="font-semibold text-foreground py-4 px-4">Start Date</TableHead>
              <TableHead className="font-semibold text-foreground py-4 px-4">End Date</TableHead>
              <TableHead className="font-semibold text-foreground py-4 px-4">Cost From</TableHead>
              <TableHead className="font-semibold text-foreground py-4 px-4 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
                </TableCell>
              </TableRow>
            ) : tours.length ? (
              tours.map((item: any) => (
                <TableRow key={item._id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium py-4 px-4">{item.title}</TableCell>
                  <TableCell className="text-muted-foreground py-4 px-4">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground py-4 px-4">
                    {item.endDate ? new Date(item.endDate).toLocaleDateString() : "—"}
                  </TableCell>
                  <TableCell className="py-4 px-4 font-medium">৳{item.costFrom ?? "—"}</TableCell>
                  <TableCell className="py-4 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <UpdateTour tourId={item._id} />
                      <DeleteConfirmation onConfirm={() => handleRemoveTour(item._id)}>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DeleteConfirmation>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                  No tours found. Add your first tour to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
