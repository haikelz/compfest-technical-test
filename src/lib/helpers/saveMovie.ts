import secureLocalStorage from "react-secure-storage";

/**
 * A function that save new data to localStorage(encrypted with react-secure-storage)
 * @param newData
 */
export function saveMovie<T>(newData: T) {
  secureLocalStorage.setItem("saved-movies", JSON.stringify(newData));
}
