export const environment = {
    production: true,
    msalConfig: {
        auth: {
            clientId: '3567c806-c10d-430c-be80-8450b0dfe876',
            authority: 'https://login.microsoftonline.com/f3b3c6c2-ac86-462e-b68e-cfbed01ead3d/',
        },
    },
    apiConfig: {
        scopes: ['user.read'],
        uri: ['https://graph.microsoft.com/v1.0/me', 'https://graph.microsoft.com/v1.0/me/photo/$value'],
    },
};
