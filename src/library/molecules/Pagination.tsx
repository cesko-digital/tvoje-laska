//TODO: Nutno ještě upravit!!!

import classNames from "helpers/classNames";
import { ArrowLeftWithLineSvg, ArrowRightWithLineSvg } from "library/icons/arrows";
import Link from "next/link";

const arrowsClasses =
  "flex items-center justify-center pr-1 text-sm font-medium text-brand-violet border-2 border-brand-violet hover:bg-brand-violet hover:text-white rounded-full aspect-square h-[56px] w-[56px]";

interface Props {
  maxPage: number;
  data: any;
  currentPage: number;
  onPageChange: (page: number) => void;
}

//TODO: Přidat funkcionalitu pro dynamické routy
const Pagination = ({ maxPage, data, currentPage, onPageChange }: Props) => {
  const pagesCount = Math.ceil(data.length / 25);

  if (pagesCount === 1) return null;
  const totalPages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < maxPage) onPageChange(currentPage + 1);
  };

  return (
    <nav className="flex items-center justify-between px-0">
      <div className="-mt-px flex w-0 flex-1">
        {currentPage > 1 && (
          <Link href="#" onClick={handlePrevious} className={arrowsClasses}>
            <ArrowLeftWithLineSvg width={24} />
            <p className="sr-only">Předchozí</p>
          </Link>
        )}
      </div>
      <div
        className="flex gap-x-2"
        // className="hidden md:-mt-px md:flex"
      >
        {totalPages.map(page => (
          <Link
            key={page}
            href="#"
            className={classNames(
              page === currentPage
                ? "bg-violet-80 text-violet-20"
                : "bg-violet-10 text-brand-violet hover:bg-violet-20",
              "flex items-center justify-center px-4 text-sm font-medium rounded-full h-8 w-8 aspect-square",
            )}
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Link>
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <Link href="#" onClick={handleNext} className={arrowsClasses}>
          <div>
            <p className="sr-only">Další</p>
            <ArrowRightWithLineSvg width={24} />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Pagination;
