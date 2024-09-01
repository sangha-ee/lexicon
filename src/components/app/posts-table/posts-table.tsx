"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { DateCell } from "./date-cell";
import { ActionsCell } from "./actions-cell";
import { type BlogPost } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { POST_LIST_PAGE_SIZE } from "@/lib/constants";

interface PostsTableProps {
  posts: BlogPost[];
  currentPage: number;
}

export const PostsTable: React.FC<PostsTableProps> = ({
  posts,
  currentPage,
}) => {
  const columns: ColumnDef<BlogPost>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "createdAt",
      header: "Created on",
      cell: ({ row }) => <DateCell blogPost={row.original} />,
    },
    {
      id: "actions",
      cell: ({ row }) => <ActionsCell blogPost={row.original} />,
    },
  ];

  const table = useReactTable({
    data: posts,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const canVisitNext = posts.length === POST_LIST_PAGE_SIZE;
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Separator />
      <div className="flex items-center justify-end space-x-2 px-10 py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={createPageURL(currentPage - 1)}
                isActive={currentPage !== 1}
                className={cn({
                  "pointer-events-none": currentPage === 1,
                })}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className={cn({
                  "pointer-events-none": !canVisitNext,
                })}
                href={createPageURL(currentPage + 1)}
                isActive={canVisitNext}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
