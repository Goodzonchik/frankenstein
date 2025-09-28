export interface UserDto {
    records: User[];
}

interface User {
    identity: {
        "low": number,
        "high": number
    },
    labels: string[],
    properties: {
        name: string;
    },
    elementId: string;

}
