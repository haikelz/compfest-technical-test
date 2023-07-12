/**
 * A function that save new data to localStorage
 * @param newData
 */
export function saveMovie<T>(newData: T) {
  localStorage.setItem("saved-movies", JSON.stringify(newData));
}
