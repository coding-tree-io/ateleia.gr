import nounAbstract4348166Raw from '@/assets/noun/normalized/noun-abstract-art-4348166.svg?raw';
import nounAbstract4348146Raw from '@/assets/noun/normalized/noun-abstract-art-4348146.svg?raw';
import nounLabyrinth5703299Raw from '@/assets/noun/normalized/noun-labyrinth-5703299.svg?raw';

export type NounSvgDefinition = {
  viewBox: string;
  paths: string[];
};

function parseNounSvg(svgRaw: string, fileName: string): NounSvgDefinition {
  const viewBoxMatch = svgRaw.match(/viewBox="([^"]+)"/i);
  if (!viewBoxMatch?.[1]) {
    throw new Error(`Missing viewBox in ${fileName}`);
  }

  const pathMatches = [...svgRaw.matchAll(/<path\b[^>]*\sd="([^"]+)"[^>]*>/gi)];
  const paths: string[] = [];

  for (const match of pathMatches) {
    const pathData = match[1];
    if (pathData) {
      paths.push(pathData);
    }
  }

  if (paths.length === 0) {
    throw new Error(`Missing path elements in ${fileName}`);
  }

  return {
    viewBox: viewBoxMatch[1],
    paths,
  };
}

export const nounSvgAbstract4348166 = parseNounSvg(nounAbstract4348166Raw, 'noun-abstract-art-4348166.svg');
export const nounSvgAbstract4348146 = parseNounSvg(nounAbstract4348146Raw, 'noun-abstract-art-4348146.svg');
export const nounSvgLabyrinth5703299 = parseNounSvg(nounLabyrinth5703299Raw, 'noun-labyrinth-5703299.svg');
