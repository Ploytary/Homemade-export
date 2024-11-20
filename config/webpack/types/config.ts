export type BuildMode = 'production' | 'development';

export interface BuildPaths {
  root: string;
  build: string;
  src: string;
}

export interface BuildEnv {
  mode: BuildMode;
  port: number;
  analyze: boolean;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  port: number;
  isAnalyze: boolean;
}
