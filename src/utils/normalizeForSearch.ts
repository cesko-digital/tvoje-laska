export const normalizeForSearch = (value: string | undefined) => value?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default normalizeForSearch