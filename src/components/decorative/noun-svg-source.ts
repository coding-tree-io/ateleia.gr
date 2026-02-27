import growthThreadRawSvg from '@/assets/noun/normalized/noun-abstract-art-4348146.svg?raw';
import guidingLabyrinthRawSvg from '@/assets/noun/normalized/noun-labyrinth-5703299.svg?raw';

// Source originals are stored in docs/ and normalized into src/assets/noun/normalized via svg:noun:normalize.

export type NounSvgDefinition = {
  viewBox: string;
  paths: string[];
};

function extractNounSvgDefinitionFromRawSvgSource(
  rawSvgContent: string,
  sourceFileName: string
): NounSvgDefinition {
  const viewBoxMatch = rawSvgContent.match(/viewBox="([^"]+)"/i);
  if (!viewBoxMatch?.[1]) {
    throw new Error(`Missing viewBox in ${sourceFileName}`);
  }

  const pathDefinitionMatches = [...rawSvgContent.matchAll(/<path\b[^>]*\sd="([^"]+)"[^>]*>/gi)];
  const pathDefinitions = pathDefinitionMatches
    .map((pathDefinitionMatch) => pathDefinitionMatch[1])
    .filter((pathDefinition): pathDefinition is string => Boolean(pathDefinition));

  if (pathDefinitions.length === 0) {
    throw new Error(`Missing path elements in ${sourceFileName}`);
  }

  return {
    viewBox: viewBoxMatch[1],
    paths: pathDefinitions,
  };
}

export const growthThreadNounSvgDefinition = extractNounSvgDefinitionFromRawSvgSource(
  growthThreadRawSvg,
  'noun-abstract-art-4348146.svg'
);

export const guidingLabyrinthNounSvgDefinition = extractNounSvgDefinitionFromRawSvgSource(
  guidingLabyrinthRawSvg,
  'noun-labyrinth-5703299.svg'
);
