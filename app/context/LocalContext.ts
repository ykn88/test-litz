import React, { createContext } from "react";

export interface LocalContextInterface {
    localObject: object
}

const LocalContext = createContext<LocalContextInterface | null>(null)

export default LocalContext
