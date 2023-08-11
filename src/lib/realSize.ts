const realSize = (str: string): number => new Blob([str]).size

export default realSize
