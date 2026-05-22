export interface Event{
    id: number;
    name: string;
    categoryId: number;
    pembicaraId: number;
    dateEvent: Date;
    location: string;
    description: string;
    createdAt?: Date;
}
