declare module "*.scss";

declare module "draftjs-to-html" {
  const draftToHtml: (
    content: any,
    hashConfig?: any,
    directional?: any,
    customEntityTransform?: any
  ) => string;
  export = draftToHtml;
}
