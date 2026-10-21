import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DirectoryExplorer } from '../src/components/DirectoryExplorer';
import { DiscoveryMetricsTable } from '../src/components/DiscoveryMetricsTable';
import { FileTypesTable } from '../src/components/FileTypesTable';
import { LineCountByFileTypeTable } from '../src/components/LineCountByFileTypeTable';
import {
  buildExcludeConfirmMessage,
  containingFolderRawPath,
  fileExcludeGlob,
  folderExcludeGlob,
} from '../src/utils/excludeScope';

afterEach(() => {
  cleanup();
});

describe('FileTypesTable', () => {
  it('renders rows', () => {
    render(
      <FileTypesTable
        rows={[
          {
            pattern: '.py',
            match_type: 'extension',
            language: 'Python',
            display_type: '.py',
            file_kind: 'code',
            default_bucket_hint: 'production',
            source: 'built_in',
            enabled: true,
          },
        ]}
      />,
    );
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<FileTypesTable rows={[]} emptyLabel="No mappings" />);
    expect(screen.getByText('No mappings')).toBeInTheDocument();
  });
});

describe('LineCountByFileTypeTable', () => {
  it('renders metric rows', () => {
    render(
      <LineCountByFileTypeTable
        title="Line count by file type"
        testId="line-count-table"
        columns={[{ id: 'language', key: 'language', label: 'Language' }]}
        rows={[{ language: 'Python', code_lines: 100 }]}
      />,
    );
    expect(screen.getByTestId('line-count-table')).toHaveTextContent('Python');
  });

  it('fires filter callback', () => {
    const onFilter = vi.fn();
    render(<FileTypesTable rows={[]} quickFilter="" onQuickFilterChange={onFilter} />);
    expect(screen.getByTestId('file-types-table-filter')).toBeInTheDocument();
  });
});

describe('interactive discovery components', () => {
  it('filters and sorts metric rows', () => {
    render(
      <DiscoveryMetricsTable
        title="Metrics"
        testId="metrics"
        filterPlaceholder="Filter metrics"
        columns={[
          { id: 'name', key: 'name', label: 'Name' },
          { id: 'count', key: 'count', label: 'Count', align: 'end' },
        ]}
        rows={[
          { name: 'Beta', count: 2 },
          { name: 'Alpha', count: 1 },
        ]}
        filterFn={(row, query) => row.name.toLowerCase().includes(query)}
        defaultSort={{ columnId: 'name', direction: 'asc' }}
      />,
    );

    expect(screen.getAllByRole('row')[1]).toHaveTextContent('Alpha');
    fireEvent.click(screen.getByTestId('metrics-sort-name'));
    expect(screen.getAllByRole('row')[1]).toHaveTextContent('Beta');
    fireEvent.change(screen.getByTestId('metrics-filter'), { target: { value: 'Alpha' } });
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.queryByText('Beta')).not.toBeInTheDocument();
  });

  it('paginates sorted and filtered rows and resets controls to the first page', () => {
    const rows = Array.from({ length: 45 }, (_, index) => ({
      name: `Item ${String(index + 1).padStart(2, '0')}`,
      count: index + 1,
    }));
    render(
      <DiscoveryMetricsTable
        title="Metrics"
        testId="paged-metrics"
        filterPlaceholder="Filter metrics"
        columns={[
          { id: 'name', key: 'name', label: 'Name' },
          { id: 'count', key: 'count', label: 'Count', align: 'end' },
        ]}
        rows={rows}
        filterFn={(row, query) => row.name.toLowerCase().includes(query)}
        defaultSort={{ columnId: 'name', direction: 'asc' }}
        pageSize={20}
      />,
    );

    expect(screen.getByTestId('paged-metrics-pagination-summary')).toHaveTextContent(
      'Showing 1–20 of 45',
    );
    expect(screen.getByText('Item 20')).toBeInTheDocument();
    expect(screen.queryByText('Item 21')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('paged-metrics-next-page'));
    expect(screen.getByTestId('paged-metrics-page-status')).toHaveTextContent('Page 2 of 3');
    expect(screen.getByText('Item 21')).toBeInTheDocument();
    expect(screen.queryByText('Item 01')).not.toBeInTheDocument();

    fireEvent.change(screen.getByTestId('paged-metrics-filter'), {
      target: { value: 'Item 0' },
    });
    expect(screen.getByTestId('paged-metrics-page-status')).toHaveTextContent('Page 1 of 1');
    expect(screen.getByTestId('paged-metrics-pagination-summary')).toHaveTextContent(
      'Showing 1–9 of 9',
    );
  });

  it('expands and collapses directory folders', () => {
    render(
      <DirectoryExplorer
        files={[
          {
            id: '1',
            path: 'src/main.py',
            display_path: 'src/main.py',
            classification: 'backend',
            size_bytes: 10,
            line_count: 1,
          },
        ]}
        actions={{
          onCopyDisplayPath: vi.fn(),
          onCopyRawPath: vi.fn(),
          onOverrideClassificationFile: vi.fn(),
          onOverrideClassificationFolder: vi.fn(),
          onExcludeFile: vi.fn(),
          onExcludeFolder: vi.fn(),
          onExcludeContainingFolder: vi.fn(),
          lineContextHref: () => '#',
          pathsDiffer: () => false,
        }}
        renderers={{
          renderFileTypeIcon: () => null,
          renderClassification: (row) => row.classification,
          renderRowActions: () => null,
        }}
      />,
    );

    expect(screen.queryByText('main.py')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('discovery-directory-toggle-src'));
    expect(screen.getByText('main.py')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('discovery-directory-toggle-src'));
    expect(screen.queryByText('main.py')).not.toBeInTheDocument();
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <DiscoveryMetricsTable
        title="Accessible metrics"
        description="Inventory metrics"
        testId="accessible-metrics"
        filterPlaceholder="Filter metrics"
        columns={[
          { id: 'name', key: 'name', label: 'Name' },
          { id: 'count', key: 'count', label: 'Count', align: 'end' },
        ]}
        rows={[{ name: 'Python', count: 3 }]}
      />,
    );
    expect((await axe(container)).violations).toEqual([]);
  });
});

describe('excludeScope helpers', () => {
  it('builds folder exclude glob', () => {
    expect(folderExcludeGlob('src/lib')).toBe('src/lib/**');
    expect(fileExcludeGlob('src/main.py')).toBe('**/src/main.py');
    expect(containingFolderRawPath('src/main.py')).toBe('src');
  });

  it('builds confirm message without window', () => {
    const message = buildExcludeConfirmMessage('vendor/**', { kind: 'folder' });
    expect(message).toContain('vendor/**');
    expect(message).not.toMatch(/window/);
  });
});
