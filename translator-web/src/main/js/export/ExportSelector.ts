export const IMPORT_COMPLETE = "IMPORT_COMPLETE";
export const IMPORT_PROGRESS = "IMPORT_PROGRESS";
export const EXPORT_COMPLETE = "EXPORT_COMPLETE";

export function selectImportProgress(state) {
  return {
    ...state.exportImportReducer.import?.progress,
  };
}

export function exportImportReducer(state = {}, action) {
  switch (action.type) {
    case IMPORT_COMPLETE:
      return { ...state };
    case IMPORT_PROGRESS:
      const progress = action?.import?.progress;
      return {
        ...state,
        import: {
          progress: {
            ...progress,
          },
        },
      };
    case EXPORT_COMPLETE:
      return { ...state };
    default:
      return { ...state };
  }
}
