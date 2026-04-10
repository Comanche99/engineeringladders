import { Framework } from '../types/index';

export const exportFrameworkAsJSON = (framework: Framework): string => {
  return JSON.stringify(framework, null, 2);
};

export const downloadJSON = (framework: Framework) => {
  const json = exportFrameworkAsJSON(framework);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `framework-${framework.name.replace(/\s+/g, '-').toLowerCase()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importFrameworkFromJSON = (jsonString: string): Framework => {
  try {
    const framework = JSON.parse(jsonString) as Framework;
    // Validate that it has the required fields
    if (!framework.name || !Array.isArray(framework.roleLevels) || !Array.isArray(framework.dimensions)) {
      throw new Error('Invalid framework format');
    }
    return framework;
  } catch (error) {
    throw new Error(`Failed to import framework: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const exportFrameworkAsMarkdown = (framework: Framework): string => {
  let markdown = `# ${framework.name}\n\n`;
  
  if (framework.description) {
    markdown += `${framework.description}\n\n`;
  }

  markdown += '## Framework Overview\n\n';

  // Create a table with role levels as columns and dimensions as rows
  markdown += '| Dimension | ' + framework.roleLevels.map(r => r.name).join(' | ') + ' |\n';
  markdown += '|-----------|' + framework.roleLevels.map(() => '---|').join('') + '\n';

  for (const dimension of framework.dimensions) {
    markdown += `| ${dimension.name} |`;
    for (const roleLevel of framework.roleLevels) {
      const expectation = framework.expectations.find(
        e => e.roleLevelId === roleLevel.id && e.dimensionId === dimension.id
      );
      const scalePoint = expectation
        ? dimension.scalePoints[expectation.scalePointIndex]?.label || 'N/A'
        : 'N/A';
      markdown += ` ${scalePoint} |`;
    }
    markdown += '\n';
  }

  markdown += '\n## Details\n\n';

  for (const roleLevel of framework.roleLevels) {
    markdown += `### ${roleLevel.name}\n\n`;
    if (roleLevel.description) {
      markdown += `${roleLevel.description}\n\n`;
    }

    for (const dimension of framework.dimensions) {
      const expectation = framework.expectations.find(
        e => e.roleLevelId === roleLevel.id && e.dimensionId === dimension.id
      );
      if (expectation) {
        const scalePoint = dimension.scalePoints[expectation.scalePointIndex];
        markdown += `**${dimension.name}**: ${scalePoint?.label || 'N/A'}`;
        if (expectation.description) {
          markdown += ` - ${expectation.description}`;
        }
        markdown += '\n\n';
      }
    }
  }

  return markdown;
};

export const downloadMarkdown = (framework: Framework) => {
  const markdown = exportFrameworkAsMarkdown(framework);
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `framework-${framework.name.replace(/\s+/g, '-').toLowerCase()}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
