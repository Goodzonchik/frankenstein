export function match(
  entity: string,
  props: string,
  value: string,
  uid: string,
): string {
  return `MATCH (${uid}:${entity} {${props}: '${value}'})`;
}

export function returnOp(uid: string): string {
  return `RETURN ${uid}`;
}

export function creatRel(type: string, uidFrom: string, uidTo: string): string {
  return `CREATE (${uidFrom})-[:${type}]->(${uidTo})`;
}

export function setLabel(uid: string, label: string): string {
  return `SET ${uid}:${label}`;
}

export function removeLabel(uid: string, label: string): string {
  return `REMOVE ${uid}:${label}`;
}

export function createNode(
  uid: string,
  type: string,
  propName: string,
  propValue: string,
): string {
  return `CREATE (${uid}:${type} {${propName}: '${propValue}'})`;
}

export function deleteNode(uid: string): string {
  return `DETACH DELETE ${uid}`;
}

export function cypherPipe(...operators): string {
  return operators.reduce((acc, operator) => acc + operator, '');
}
