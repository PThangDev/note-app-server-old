export const createResponse = <TData, TMeta = {}>(
  data: TData,
  meta: TMeta,
  message: string = ''
) => {
  return { data, meta, message };
};
