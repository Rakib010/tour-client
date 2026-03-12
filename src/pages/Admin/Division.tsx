/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import AddDivisionModal from "@/components/modules/Division/AddDivisionModal";
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
  useDeleteDivisionMutation,
  useGetDivisionsQuery,
} from "@/redux/features/division/division.api";
import { Trash2, Loader2, Map } from "lucide-react";
import { toast } from "sonner";

export default function Division() {
  const { data, isLoading } = useGetDivisionsQuery(undefined);
  const divisionData = data?.data || [];
  const [DeleteDivision] = useDeleteDivisionMutation();

  const handleRemoveDivision = async (id: string) => {
    try {
      const res = await DeleteDivision(id);
      if (res.data?.success) {
        toast.success("Division Deleted Successfully");
      }
    } catch {
      toast.error("An error occurred while deleting");
    }
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Map className="h-7 w-7 text-primary" />
            Divisions
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage geographic divisions
          </p>
        </div>
        <AddDivisionModal />
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
              <TableHead className="font-semibold text-foreground py-4 px-4">Name</TableHead>
              <TableHead className="font-semibold text-foreground py-4 px-4">Slug</TableHead>
              <TableHead className="font-semibold text-foreground py-4 px-4 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
                </TableCell>
              </TableRow>
            ) : divisionData.length ? (
              divisionData.map((item: any) => (
                <TableRow key={item._id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium py-4 px-4">{item.name}</TableCell>
                  <TableCell className="text-muted-foreground py-4 px-4 font-mono text-sm">
                    {item.slug}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-right">
                    <DeleteConfirmation onConfirm={() => handleRemoveDivision(item._id)}>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DeleteConfirmation>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-12 text-muted-foreground">
                  No divisions found. Add your first division.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
