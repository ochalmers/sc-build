import { getChaptersForPage, getPageByPath } from "../content/workspace.js";

export function getChaptersForPath(pathname) {
  const page = getPageByPath(pathname);
  return getChaptersForPage(page);
}

export function getChapterScrollIds(pathname) {
  return getChaptersForPath(pathname).map((c) => c.id);
}

export function getActiveChapterLabel(chapters, activeId) {
  const match = chapters.find((c) => c.id === activeId);
  return match?.shortLabel ?? chapters[0]?.shortLabel ?? "Overview";
}
