export const sortByStringProp = (array: any[], prop: string) => {
    return array.sort((a,b) => (a[prop] > b[prop]) ? 1 : ((b[prop] > a[prop]) ? -1 : 0));
}
