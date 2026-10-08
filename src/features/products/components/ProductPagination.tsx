"use client";

import { useRouter, useSearchParams } from "next/navigation";

type ProductPaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange?: (page: number) => void;
};

export function ProductPagination({
  page,
  pageSize,
  total,
  onPageChange,
}: ProductPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pageCount || newPage === page) return;

    if (onPageChange) {
      onPageChange(newPage);
    } else {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      params.set("page", newPage.toString());
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <nav
      aria-label="Pagination Navigation"
      className="flex w-full items-center justify-center gap-3 pt-8 lg:pt-10"
    >
      {/* Previous Page Button */}
      <button
        type="button"
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
        className="flex size-10 cursor-pointer items-center justify-center rounded border border-[#ebe6de] bg-white text-[#1a1a1a] transition-all hover:border-[#1a1a1a] hover:bg-[#faf8f5] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#ebe6de] disabled:hover:bg-white"
        aria-label="Previous page"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => {
          const isActive = p === page;
          return (
            <button
              key={p}
              type="button"
              onClick={() => handlePageChange(p)}
              className={`flex size-10 cursor-pointer items-center justify-center rounded text-xs font-semibold transition-all ${
                isActive
                  ? "bg-[#1a1a1a] text-white"
                  : "border border-[#ebe6de] bg-white text-[#605a54] hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* Next Page Button */}
      <button
        type="button"
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= pageCount}
        className="flex size-10 cursor-pointer items-center justify-center rounded border border-[#ebe6de] bg-[#1a1a1a] text-white transition-all hover:bg-black disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-[#ebe6de] disabled:text-[#8a857f]"
        aria-label="Next page"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </nav>
  );
}
