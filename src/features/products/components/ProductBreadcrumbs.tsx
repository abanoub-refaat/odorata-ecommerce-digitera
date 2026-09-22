/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { productPaths } from "@/features/products/paths";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type ProductBreadcrumbsProps = {
  items?: BreadcrumbItem[];
};

export function ProductBreadcrumbs({ items }: ProductBreadcrumbsProps) {
  const breadcrumbs: BreadcrumbItem[] = items ?? [
    { label: "Home", href: productPaths.list },
    { label: "Shop", href: productPaths.list },
    { label: "All Fragrances" },
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 px-4 py-4 sm:px-6 sm:py-6 md:px-10 lg:px-20"
    >
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        if (isLast) {
          return (
            <span
              key={item.label}
              className="text-[12px] font-medium whitespace-nowrap text-[#1a1a1a]"
            >
              {item.label}
            </span>
          );
        }

        return (
          <span key={item.label} className="flex items-center gap-2">
            <Link
              href={item.href ?? productPaths.list}
              className="text-[12px] font-normal whitespace-nowrap text-[#605a54] transition-colors hover:text-[#1a1a1a]"
            >
              {item.label}
            </Link>
            <img src="/icons/chevron-right.svg" alt="" width={10} height={10} />
          </span>
        );
      })}
    </nav>
  );
}
