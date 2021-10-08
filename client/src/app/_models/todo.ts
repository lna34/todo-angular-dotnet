import { Guid } from "guid-typescript";

export interface Todo{
    id: string,
    isDone: boolean,
    isEdit: boolean,
    isDisabled: boolean;
    description: string
}

export enum TodoActions {
    ON_DELETE_TODO,
    ON_ADD_TODO,
    ON_EDIT_TODO,
    ON_DONE_TODO
}