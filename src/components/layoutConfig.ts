/**
 * Shared Layout configuration guidelines (65/35 ratio)
 * and standard graph dimensions.
 */
export const LAYOUT_CONFIG = {
  // Container class for slide rows
  containerClass: "flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden",

  // Left child (visuals/graphs) - takes 65% width on large screens
  leftSideClass: "flex-[65] lg:flex-[65] min-h-0 min-w-0 flex items-center justify-center bg-white/40 border border-slate-200/50 rounded-3xl p-3 shadow-inner overflow-hidden",

  // Right child (sidebar/text) - takes 35% width on large screens
  rightSideClass: "flex-[35] lg:flex-[35] w-full lg:w-[35%] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto",

  // Default graph layout dimensions
  graphWidth: 480,
  graphHeight: 480,
  graphScale: 68,
  graphRange: 3,
};
