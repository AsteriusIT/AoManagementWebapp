import { Policy } from "./policy";

export interface Project {
    id: string;
    client: string;
    shortName: string;
    deadline: string;
    policies: Policy[];
}