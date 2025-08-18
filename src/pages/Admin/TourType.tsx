/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import AddTourTypeModal from "@/components/modules/TourTypes/AddTourTypeModal";
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  useDeleteTourTypeMutation,
  useGetTourTypesQuery,
} from "@/redux/features/tourType/tourType.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function TourType() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { data } = useGetTourTypesQuery({ page: currentPage, limit });
  const [DeleteTourType] = useDeleteTourTypeMutation();

  // Format date and time
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const handleRemoveTourType = async (id: string) => {
    try {
      const res = await DeleteTourType(id);

      if (res.success) {
        toast.success("Tour Type Deleted Successfully");
      }
    } catch (error) {
      //console.error("Delete error:", error);
      toast.error("An error occurred while deleting");
    }
  };
  console.log(data);
  const totalPage = data?.meta?.totalPage || 1;

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      {/* Header */}
      <div className="flex justify-between items-center my-8">
        <h1 className="text-2xl font-bold text-gray-800">Tour Types</h1>
        <AddTourTypeModal />
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-left font-semibold text-gray-700 w-1/3">
                Tour Types Name
              </TableHead>
              <TableHead className="text-center font-semibold text-gray-700 w-1/3">
                Created At
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700 w-1/3 ">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.data?.length ? (
              data.data.map(
                (item: { createdAt: string; name: string; _id: string }) => (
                  <TableRow
                    key={item.name}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Left aligned name */}
                    <TableCell className="text-left font-medium text-gray-800">
                      {item.name}
                    </TableCell>

                    {/* Centered date */}
                    <TableCell className="text-center text-gray-600">
                      {formatDate(item.createdAt)}
                    </TableCell>

                    {/* Right aligned action */}
                    <TableCell className="text-right">
                      <DeleteConfirmation
                        onConfirm={() => handleRemoveTourType(item._id)}
                      >
                        <Button size="sm">
                          <Trash2 />
                        </Button>
                      </DeleteConfirmation>
                    </TableCell>
                  </TableRow>
                )
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-6 text-gray-500"
                >
                  No tour types found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {totalPage > 1 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                (page) => (
                  <PaginationItem
                    key={page}
                    onClick={() => setCurrentPage(page)}
                  >
                    <PaginationLink isActive={currentPage === page}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={
                    currentPage === totalPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
