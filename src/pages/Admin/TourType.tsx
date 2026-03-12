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
import { Trash2, Tag } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function TourType() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);

  const { data } = useGetTourTypesQuery({ page: currentPage, limit });
  const [DeleteTourType] = useDeleteTourTypeMutation();

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
      if (res.data?.success) {
        toast.success("Tour Type Deleted Successfully");
      }
    } catch {
      toast.error("An error occurred while deleting");
    }
  };

  const totalPage = data?.meta?.totalPage || 1;
  const tourTypes = data?.data || [];

  return (
    <div className="w-full max-w-[1280px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Tag className="h-7 w-7 text-primary" />
            Tour Types
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage tour categories
          </p>
        </div>
        <AddTourTypeModal />
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
              <TableHead className="font-semibold text-foreground py-4 px-4">Name</TableHead>
              <TableHead className="font-semibold text-foreground py-4 px-4 text-center">Created</TableHead>
              <TableHead className="font-semibold text-foreground py-4 px-4 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tourTypes.length ? (
              tourTypes.map((item: { createdAt: string; name: string; _id: string }) => (
                <TableRow key={item._id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium py-4 px-4">{item.name}</TableCell>
                  <TableCell className="text-muted-foreground text-center py-4 px-4">
                    {formatDate(item.createdAt)}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-right">
                    <DeleteConfirmation onConfirm={() => handleRemoveTourType(item._id)}>
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
                  No tour types found. Add your first type.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPage > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                  <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={
                    currentPage === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"
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
