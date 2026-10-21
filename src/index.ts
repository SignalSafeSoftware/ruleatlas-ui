export { DirectoryExplorer } from './components/DirectoryExplorer.js';
export {
  DiscoveryMetricsTable,
  formatPercent,
  bucketLabel,
  BUCKET_LABELS,
  type MetricsTableColumn,
  type MetricsTableExpandable,
  type MetricsTableFooterContext,
  type MetricsTableFooterSpec,
  type MetricsTableScopeOption,
  type SortDirection,
  type TieBreaker,
} from './components/DiscoveryMetricsTable.js';
export { DiscoveryRowToggle, DiscoveryRowToggleSpacer } from './components/DiscoveryRowToggle.js';
export { FileTypeBadge, FileTypesTable } from './components/FileTypesTable.js';
export { LineCountByFileTypeTable, type LineCountByFileTypeTableProps } from './components/LineCountByFileTypeTable.js';
export type { RowActionItem } from './types/actions.js';
export type {
  DiscoveryInventoryFile,
  DirectoryExplorerActions,
  DirectoryExplorerRenderers,
  FileTypeMappingRow,
  FileTypesTableProps,
} from './types/discovery.js';
export {
  allExpandableFolderIds,
  buildDirectoryTree,
  computeDirectoryExplorerTotals,
  DEFAULT_DIRECTORY_SORT,
  directoryNodeKindLabel,
  estimateTokenCount,
  extensionFromPath,
  flattenLazyVisibleTree,
  flattenVisibleTree,
  folderRawPath,
  getExplorerSortGroup,
  naturalCompare,
  normalizeDiscoveryFile,
  sortDirectoryTree,
  sortSiblingNodes,
  sumDirectoryExplorerSubfoldersFooter,
  topLevelFolderIds,
  type DirectorySortColumnId,
  type DirectorySortDirection,
  type DirectoryTreeNode,
  type FlatDirectoryRow,
} from './utils/directoryTree.js';
export { buildDiscoveryFileRowActions, type DiscoveryInventoryFileRow } from './utils/discoveryFileRowActions.js';
export {
  buildExcludeConfirmMessage,
  containingFolderDisplayPath,
  containingFolderRawPath,
  fileExcludeGlob,
  folderExcludeGlob,
  isProjectRootExcludeTarget,
  type ExcludeConfirmKind,
} from './utils/excludeScope.js';
export { formatBytes } from './utils/formatBytes.js';
export { humanizeToken, humanizeTokenLower } from './utils/humanizeToken.js';
export { formatInteger } from './utils/numberFormat.js';
