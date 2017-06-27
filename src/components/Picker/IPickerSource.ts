export interface IPickerSource<T> {
    performFilter(filterString: string): Promise<T[]>,
}
