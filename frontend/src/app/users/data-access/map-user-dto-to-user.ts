import { User } from "./user";
import { UserDto } from "./users.dto";

export function mapUsersDtoToUser(usersDto: UserDto): User[] {
    return usersDto.records.map(item =>({
            id: item.elementId,
            name: item.properties.name,
            gender : getGenderLabel(item.labels),
            labels: item.labels.filter(item => !['Male', 'Female'].includes(item)) || []
            
        }) 
    )
}

function getGenderLabel(labels: string[]): string | null {
        return labels.find(item => ['Male', 'Female'].includes(item)) || null;
}
