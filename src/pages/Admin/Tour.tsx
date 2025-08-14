/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import AddTourModal from "@/components/modules/Tour/AddTourModal";
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
import { Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";

export default function TourPackageTable() {
  const { data: tourData = [], isLoading } = useGetTourQuery(undefined);
  const [DeleteTour] = useDeleteTourMutation();

  const handleRemoveTour = async (id: string) => {
    console.log(id);
    try {
      const res = await DeleteTour(id);
      console.log(res);
      if (res.success) {
        toast.success("Tour Type Deleted Successfully");
      }
    } catch {
      //console.log(error)
      toast.error("An error occurred while deleting");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      {/* Header */}
      <div className="flex justify-between items-center my-8">
        <h1 className="text-2xl font-bold text-gray-800">Tour Packages</h1>
        <AddTourModal />
      </div>
      {/* Table */}
      <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-1/5 text-left font-semibold text-gray-700 pl-6">
                Title
              </TableHead>
              <TableHead className="w-1/5 text-left font-semibold text-gray-700">
                Start Date
              </TableHead>
              <TableHead className="w-1/5 text-left font-semibold text-gray-700">
                End Date
              </TableHead>
              <TableHead className="w-1/5 text-left font-semibold text-gray-700">
                Cost From
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700 pr-6 ">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-gray-500"
                >
                  Loading tours...
                </TableCell>
              </TableRow>
            ) : tourData?.data?.data?.length ? (
              tourData.data.data.map((item: any) => (
                <TableRow
                  key={item._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="font-medium text-gray-800">
                    {item.title}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {item.startDate
                      ? new Date(item.startDate).toLocaleDateString()
                      : "—"}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {item.endDate
                      ? new Date(item.endDate).toLocaleDateString()
                      : "—"}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {item.costFrom ?? "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        <Pencil size={16} />
                      </Button>
                      <DeleteConfirmation
                        onConfirm={() => handleRemoveTour(item._id)}
                      >
                        <Button size="sm">
                          <Trash2 />
                        </Button>
                      </DeleteConfirmation>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-gray-500"
                >
                  No tours found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
