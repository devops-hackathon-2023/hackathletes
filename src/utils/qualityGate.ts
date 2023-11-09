export const formatQualityType = (qualityType: string): string => {
  switch (qualityType) {
    case 'SECURITY_HOTSPOTS_REVIEWED':
      return 'Security hotspots reviewed';
    case 'CODE_COVERAGE':
      return 'Code coverage';
    case 'DUPLICATED_LINES':
      return 'Duplicated lines';
    case 'XRAY_DOCKER':
      return 'Xray Docker';
    case 'MAINTAINABILITY_RATING':
      return 'Maintainability rating';
    case 'RELIABILITY_RATING':
      return 'Reliability rating';
    case 'SECURITY_RATING':
      return 'Security rating';
    default:
      throw new Error(`Unknown QualityType: ${qualityType}`);
  }
};
