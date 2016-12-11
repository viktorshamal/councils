export function authorized(user) {
    let authorizedRoles = ['admin','moderator'];
    let attributes = user.get('attributes');

    if(attributes && attributes.has('role_names')) {
        return attributes.get('role_names').some(function (role, i) {
            return authorizedRoles[i]==role;
        });
    }
}