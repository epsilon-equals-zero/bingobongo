import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, Timestamp } from "@firebase/firestore";

export type WithRefPart<T> = T & { refPath: string };
export type WithId<T, ID = string> = T & { id: ID };
export type WithUid<T> = T & { uid: string };
export type WithTimestamps<T> = T & { createdAt: Date; updatedAt: Date };

export type Game = WithId<
    WithUid<
        WithTimestamps<{
            name: string;
            size: number;
            categories: string[];
            uid: string;
        }>
    >
>;

export class GameConverter implements FirestoreDataConverter<Game> {
    toFirestore(modelObject: Game): DocumentData {
        const { createdAt, updatedAt, ...other } = modelObject;

        return {
            createdAt: Timestamp.fromDate(createdAt),
            updatedAt: Timestamp.fromDate(updatedAt),
            ...other,
        };
    }

    fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): Game {
        const { createdAt, updatedAt, ...other } = snapshot.data();

        return {
            createdAt: (createdAt as Timestamp).toDate(),
            updatedAt: (updatedAt as Timestamp).toDate(),
            id: snapshot.id,
            ...other,
        } as Game;
    }
}
