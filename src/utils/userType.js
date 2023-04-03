export const userTypeList = [
    {label: 'Usuário Padrão', value: 'General User' },
    {label: 'Investigador', value: 'Researcher' },
    {label: 'Administrador', value: 'General User' }
]

export function getUserTypeLabelsList () {
    var list = []

    userTypeList.map((userType) => {
        list.push(userType.label)
    })

    return list
}

export function getUserTypeByLabel (userTypeLabel) {
    userTypeList.map((userType) => {
        if (userType.label == userTypeLabel){
            return userType.value
        }
    })
}