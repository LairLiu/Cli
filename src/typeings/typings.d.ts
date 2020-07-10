declare module "*.config.json" {
  const Config: configJSON;
  export default Config;
}

interface configJSON {
  basePath: string;
  template: {
    [key: string]: {
      git: string;
      golbal: string;
    }
  };
}