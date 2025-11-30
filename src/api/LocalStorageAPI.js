export function loadAssignmentsFromStorage() {
  const data = localStorage.getItem("assignments");
  return data ? JSON.parse(data) : [];
}

export function saveAssignmentsToStorage(data) {
  localStorage.setItem("assignments", JSON.stringify(data));
}
