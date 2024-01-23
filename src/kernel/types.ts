export type Entity<TIdentifier extends number | string> = {
    id?: TIdentifier;
};

export type Consult<EntityType> = {
    entities: EntityType[];
    total: number;
    fields?: [
      {
        key: string;
        label: string;
        visible: boolean;
      }?
    ];
  };