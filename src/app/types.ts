export interface Item<T> {
    title?: string;
    value: T;
};

export interface ModelItem<T extends string> extends Item<T> {
    title?: string;
    value: T;
}