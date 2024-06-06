export const cssResponsive = (xs: number, sm: number, md: number, lg: number, xl: number, xxl: number) => ({
    xs, sm, md, lg, xl, xxl,
});

export const cssResponsiveWithOrder = (
    [xs, xsOrder]: [number, number],
    [sm, smOrder]: [number, number],
    [md, mdOrder]: [number, number],
    [lg, lgOrder]: [number, number],
    [xl, xlOrder]: [number, number],
    [xxl, xxlOrder]: [number, number]
) => ({
    xs, xsOrder,
    sm, smOrder,
    md, mdOrder, 
    lg, lgOrder,
    xl, xlOrder,
    xxl, xxlOrder
});