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
import { Trash2, Pencil, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Division() {
  const { data, isLoading } = useGetDivisionsQuery(undefined);
  const divisionData = data?.data || [];
  const [DeleteDivision] = useDeleteDivisionMutation();

  const handleRemoveDivision = async (id: string) => {
    try {
      const res = await DeleteDivision(id);
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
        <h1 className="text-2xl font-bold text-gray-800">Divisions</h1>
        <AddDivisionModal />
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow className="bg-gray-700">
              <TableHead className="w-1/3 text-left font-semibold text-gray-50">
                Name
              </TableHead>
              <TableHead className="w-1/3 text-left font-semibold text-gray-50">
                Slug
              </TableHead>
              <TableHead className="w-1/3 text-right font-semibold text-gray-50">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-6 text-gray-500"
                >
                  <div className="flex justify-center items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-green-500" />
                    <span>Loading divisions...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : divisionData.length ? (
              divisionData.map((item: any) => (
                <TableRow
                  key={item._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="w-1/3 font-medium text-gray-800 truncate">
                    {item.name}
                  </TableCell>
                  <TableCell className="w-1/3 text-gray-600 truncate">
                    {item.slug}
                  </TableCell>
                  <TableCell className="w-1/3 text-right">
                    <div className="flex justify-end gap-2">
                      <DeleteConfirmation
                        onConfirm={() => handleRemoveDivision(item._id)}
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
                  colSpan={3}
                  className="text-center py-6 text-gray-500"
                >
                  No divisions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
