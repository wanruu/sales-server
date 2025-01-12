type EntityType<T> = {
    [K in keyof T]: T[K];
};
