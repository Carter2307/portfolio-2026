/**
 * Two short rails bridging the gap between stacked cards on desktop, so the
 * group reads as one continuous surface. Mobile stacks the cards instead.
 */
export function CardConnector() {
  return (
    <div aria-hidden="true" className="relative hidden h-8 lg:block">
      <span className="absolute top-0 left-10 h-full w-[3px] bg-gray-100" />
      <span className="absolute top-0 right-10 h-full w-[3px] bg-gray-100" />
    </div>
  );
}
