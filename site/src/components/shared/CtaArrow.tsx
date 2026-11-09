import { ArrowRight } from 'lucide-react';

/** Thin arrow for CTA buttons; inherits the button text color. Use inside a link with the `btn-arrow` class. */
const CtaArrow = ({ className = 'size-4' }: { className?: string }) => (
  <ArrowRight aria-hidden strokeWidth={1.75} className={`btn-arrow-icon ${className}`} />
);

export default CtaArrow;
