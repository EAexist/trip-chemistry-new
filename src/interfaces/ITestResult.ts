import { ITripTag } from "../reducers/testAnswerReducer";
import { ITripCharacter, defaultTripCharacter } from "./ITripCharacter";

export interface ITestResult{
    // id?: string;
    tripTagList: ITripTag[];
    tripCharacter: ITripCharacter;
    // placeGroup: string[];
}
export const defaultTestResult : ITestResult = {
    tripTagList: [],
    tripCharacter: defaultTripCharacter,
}