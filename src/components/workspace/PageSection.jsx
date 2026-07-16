import {
  EYEBROW,
  PAGE_CONTAINER,
  PAGE_GUTTER,
  SECTION_BODY,
  SECTION_PAD,
  SECTION_SCROLL,
  SECTION_TITLE,
} from "./pageLayout.js";
import SectionComments from "../comments/SectionComments.jsx";

export default function PageSection({
  id,
  label,
  title,
  description,
  children,
  className = "",
  fullWidth = false,
}) {
  return (
    <section
      id={id}
      className={`${SECTION_SCROLL} border-b border-ink-200/60 ${SECTION_PAD} ${className}`.trim()}
    >
      <div className={fullWidth ? PAGE_GUTTER : PAGE_CONTAINER}>
        <p className={EYEBROW}>{label}</p>
        <h2 className={`mt-3 ${SECTION_TITLE}`}>{title}</h2>
        {description ? <p className={SECTION_BODY}>{description}</p> : null}
        {id ? <SectionComments scopeKey={`section:${id}`} /> : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
